import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import FeedbackForm from "~/components/feedbackForm";
import Toast from "~/components/toast";
import { useToast } from "~/hooks/useToast";

const FeedbackPage: NextPage = () => {
  const { showToast, toastText, showToastMessage, hideToast } = useToast();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("feedback_page_viewed");
  }, [posthog]);

  const handleSuccess = () => {
    showToastMessage("Feedback submitted successfully!");
    posthog.capture("feedback_page_success");
  };

  const handleError = (error: string) => {
    showToastMessage(`Error: ${error}`);
    posthog.capture("feedback_page_error", { error });
  };

  return (
    <>
      <Head>
        <title>Feedback - Panda Express Nutrition Info</title>
        <meta
          name="description"
          content="Share your feedback about the Panda Express Nutrition Info app. Help us improve your experience with our nutrition calculator."
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#9d0208] via-[#370617] to-[#9d0208]">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/">
                <button 
                  onClick={() => posthog.capture("feedback_page_back_to_calculator")}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Nutrition Calculator
                </button>
              </Link>
              
              <h1 className="text-xl font-bold text-white">
                Share Your Feedback
              </h1>
              
              <div className="w-48" /> {/* Spacer for centering */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              We Want to Hear From You!
            </h2>
            
            <p className="text-xl text-gray-200 mb-2">
              We&apos;ve recently launched a major UI overhaul to improve your experience.
            </p>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your feedback is invaluable in helping us make the Panda Express Nutrition 
              Calculator even better. Please share your thoughts, report any issues, 
              or suggest improvements.
            </p>
          </div>

          {/* Feedback Form Card */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your Feedback Matters
              </h3>
              <p className="text-gray-600">
                All fields are required. We&apos;ll review your feedback and may reach out 
                if we need clarification.
              </p>
            </div>

            <FeedbackForm onSuccess={handleSuccess} onError={handleError} />
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">
                What We&apos;d Love to Know
              </h4>
              <ul className="text-gray-200 space-y-2 text-sm">
                <li>• How do you like the new interface design?</li>
                <li>• Are the nutrition calculations accurate for your needs?</li>
                <li>• Is the app easy to navigate on your device?</li>
                <li>• Any features you&apos;d like to see added?</li>
                <li>• Any bugs or issues you&apos;ve encountered?</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">
                Privacy & Response
              </h4>
              <ul className="text-gray-200 space-y-2 text-sm">
                <li>• Your email is only used to respond to your feedback</li>
                <li>• We don&apos;t share your information with third parties</li>
                <li>• For urgent issues, please include &quot;URGENT&quot; in your message</li>
                <li>• Analytics events are anonymized for product improvement</li>
              </ul>
            </div>
          </div>

          {/* Return Link */}
          <div className="mt-8 text-center">
            <Link href="/">
              <button 
                onClick={() => posthog.capture("feedback_page_return_to_calculator")}
                className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return to Nutrition Calculator
              </button>
            </Link>
          </div>
        </main>

        {/* Toast Notifications */}
        {showToast && (
          <div className="fixed left-[50%] bottom-[20px] translate-x-[-50%] z-50">
            <Toast itemName={toastText} setShowToast={hideToast} />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackPage;
