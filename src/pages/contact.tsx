import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import FeedbackForm from "~/components/feedbackForm";
import Toast from "~/components/toast";
import { useToast } from "~/hooks/useToast";

const ContactPage: NextPage = () => {
  const { showToast, toastText, showToastMessage, hideToast } = useToast();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("contact_page_viewed");
  }, [posthog]);

  const handleSuccess = () => {
    showToastMessage("Message sent!");
    posthog.capture("contact_page_success");
  };

  const handleError = (error: string) => {
    showToastMessage(`Error: ${error}`);
    posthog.capture("contact_page_error", { error });
  };

  return (
    <>
      <Head>
        <title>Contact - Panda Express Nutrition Calculator</title>
        <meta
          name="description"
          content="Contact the Panda Express Nutrition Calculator team."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#9d0208] via-[#370617] to-[#9d0208]">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/">
                <button className="flex items-center text-white hover:text-yellow-400 transition-colors duration-200">
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

              <h1 className="text-xl font-bold text-white">Contact Us</h1>

              <div className="w-48" />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Use the form below to reach us about issues, suggestions, or data
              requests.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Contact Form
              </h3>
              <p className="text-gray-600">
                All fields are required. We&apos;ll respond as soon as possible.
              </p>
            </div>

            <FeedbackForm onSuccess={handleSuccess} onError={handleError} />
          </div>

          <div className="mt-8 text-center text-sm text-gray-200">
            Your email is only used to respond to your message. For privacy
            questions or deletion requests, please use this form.
          </div>
        </main>

        {showToast && (
          <div className="fixed left-[50%] bottom-[20px] translate-x-[-50%] z-50">
            <Toast itemName={toastText} setShowToast={hideToast} />
          </div>
        )}
      </div>
    </>
  );
};

export default ContactPage;
