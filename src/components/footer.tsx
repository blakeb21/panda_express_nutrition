
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

export default function Footer() {
    const today = new Date();
    const posthog = usePostHog();

    const handleFooterFeedbackClick = () => {
        posthog.capture("footer_feedback_link_clicked");
    };

  return (
<footer className="flex bg-black w-full p-4 md:p-6 justify-center">
    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
        <span className="text-slate-400 text-center md:text-left">
            &copy; {today.getFullYear()} <a href="https://www.blakebarnhill.com" className="hover:text-slate-300 transition-colors duration-200">Blake Barnhill.</a> All rights reserved.
        </span>
        <div className="flex items-center">
            <span className="hidden md:inline text-slate-500 mx-2">|</span>
            <Link href="/feedback">
                <button 
                    onClick={handleFooterFeedbackClick}
                    className="text-slate-400 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 rounded px-2 py-1"
                    aria-label="Share feedback about the website"
                >
                    Feedback
                </button>
            </Link>
        </div>
    </div>
</footer>

  )
}
