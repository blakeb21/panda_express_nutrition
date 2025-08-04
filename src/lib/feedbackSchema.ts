import { z } from "zod";

// Zod validation schema for feedback form
export const feedbackFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters")
    .trim(),
  feedback: z
    .string()
    .min(10, "Feedback must be at least 10 characters long")
    .max(5000, "Feedback must be less than 5000 characters")
    .trim(),
});

// TypeScript types derived from Zod schema
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

// API response types
export interface FeedbackApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Form state interface
export interface FeedbackFormState {
  data: FeedbackFormData;
  errors: Partial<Record<keyof FeedbackFormData, string>>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

// Initial form state
export const initialFormState: FeedbackFormState = {
  data: {
    name: "",
    email: "",
    feedback: "",
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};