import { useState, useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import { 
  feedbackFormSchema, 
  type FeedbackFormData, 
  type FeedbackFormState, 
  type FeedbackApiResponse,
  initialFormState 
} from "~/lib/feedbackSchema";

interface FeedbackFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess, onError }) => {
  const [formState, setFormState] = useState<FeedbackFormState>(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);
  const posthog = usePostHog();

  const validateField = useCallback((name: keyof FeedbackFormData, value: string) => {
    try {
      // Individual field validation
      if (name === "name") {
        if (value.trim().length < 2) return "Name must be at least 2 characters long";
        if (value.length > 100) return "Name must be less than 100 characters";
      } else if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        if (value.length > 254) return "Email must be less than 254 characters";
      } else if (name === "feedback") {
        if (value.trim().length < 10) return "Feedback must be at least 10 characters long";
        if (value.length > 5000) return "Feedback must be less than 5000 characters";
      }
      return null;
    } catch (error) {
      return "Invalid input";
    }
  }, []);

  const handleInputChange = useCallback((
    field: keyof FeedbackFormData,
    value: string
  ) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: "" },
    }));
  }, []);

  const handleInputBlur = useCallback((
    field: keyof FeedbackFormData,
    value: string
  ) => {
    const error = validateField(field, value);
    if (error) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error },
      }));
    }
  }, [validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationResult = feedbackFormSchema.safeParse(formState.data);
    
    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof FeedbackFormData, string>> = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FeedbackFormData;
        fieldErrors[fieldName] = issue.message;
      });
      
      setFormState(prev => ({ ...prev, errors: fieldErrors }));
      posthog.capture("feedback_form_validation_error", {
        errors: Object.keys(fieldErrors),
      });
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));
    posthog.capture("feedback_form_submit_attempt");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState.data),
      });

      const result = await response.json() as FeedbackApiResponse;

      if (response.ok && result.success) {
        setFormState(initialFormState);
        setShowSuccess(true);
        posthog.capture("feedback_form_submit_success");
        onSuccess?.();
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error(result.message || "Failed to submit feedback");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      posthog.capture("feedback_form_submit_error", { error: errorMessage });
      onError?.(errorMessage);
      
      setFormState(prev => ({
        ...prev,
        errors: { feedback: errorMessage },
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.data, posthog, onSuccess, onError]);

  const { data, errors, isSubmitting } = formState;

  return (
    <div className="max-w-2xl mx-auto">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Thank you for your feedback! We&apos;ve received your message and will review it soon.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={(e) => handleInputBlur("name", e.target.value)}
              className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                errors.name ? "border-red-300" : ""
              }`}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={(e) => handleInputBlur("email", e.target.value)}
              className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                errors.email ? "border-red-300" : ""
              }`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Feedback Field */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Feedback <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <textarea
              id="feedback"
              name="feedback"
              rows={6}
              value={data.feedback}
              onChange={(e) => handleInputChange("feedback", e.target.value)}
              onBlur={(e) => handleInputBlur("feedback", e.target.value)}
              className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                errors.feedback ? "border-red-300" : ""
              }`}
              placeholder="Please share your thoughts about the new UI, any issues you've encountered, or suggestions for improvement..."
              disabled={isSubmitting}
              aria-describedby={errors.feedback ? "feedback-error" : undefined}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {data.feedback.length}/5000 characters
          </p>
          {errors.feedback && (
            <p className="mt-2 text-sm text-red-600" id="feedback-error">
              {errors.feedback}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;