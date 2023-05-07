import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

import "~/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag"

const MyApp: AppType = ({ Component, pageProps }) => {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID as string}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID as string}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
