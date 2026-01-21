import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy - Panda Express Nutrition Calculator</title>
        <meta
          name="description"
          content="Privacy information for the Panda Express Nutrition Calculator."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#9d0208] via-[#370617] to-[#9d0208]">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="text-white hover:text-yellow-400">
                Back to Calculator
              </Link>
              <h1 className="text-xl font-bold text-white">Privacy</h1>
              <div className="w-40" />
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-gray-100">
            <h2 className="text-2xl font-semibold text-white mb-4">
              How We Use Data
            </h2>
            <p className="mb-4 text-sm text-gray-200">
              We use analytics (PostHog) to understand how the calculator is
              used and to improve performance and usability. These events are
              anonymized and are not sold or shared with third parties.
            </p>
            <p className="mb-4 text-sm text-gray-200">
              If you submit feedback, your message and email are used only to
              respond to you. We do not add you to marketing lists.
            </p>
            <p className="text-sm text-gray-200">
              For privacy questions or deletion requests, please use the{" "}
              <Link href="/feedback" className="text-yellow-300 underline">
                feedback form
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPage;
