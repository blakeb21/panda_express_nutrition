import { useState } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

interface AlertBannerProps {
  className?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const posthog = usePostHog();

  const handleFeedbackClick = () => {
    posthog.capture("alert_banner_feedback_click");
  };

  const handleDismiss = () => {
    setIsVisible(false);
    posthog.capture("alert_banner_dismissed");
  };

  if (!isVisible) return null;

  return (
    <div className={`relative bg-gradient-to-r from-yellow-400 to-yellow-500 border-b-2 border-yellow-600 ${className}`}>
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-yellow-600">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c.0.000 2.44 1.82 4.168 2M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6"
                />
              </svg>
            </span>
            <p className="ml-3 font-medium text-gray-900 truncate">
              <span className="md:hidden">
                🎉 Major UI overhaul complete! 
              </span>
              <span className="hidden md:inline">
                🎉 We&apos;ve completely overhauled the user interface for a better experience! 
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link href="/feedback">
              <button 
                onClick={handleFeedbackClick}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
              >
                Share Feedback
              </button>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={handleDismiss}
              aria-label="Dismiss alert"
            >
              <svg
                className="h-6 w-6 text-gray-900 hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;