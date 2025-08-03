import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useCallback } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ResultTable from "~/components/resultTable";
import Table from "~/components/table";
import Toast from "~/components/toast";
import { useToast } from "~/hooks/useToast";
import { useNutritionCalculator } from "~/hooks/useNutritionCalculator";
import { SEO_CONFIG, ICON_SIZES, SR_TEXT } from "~/constants";

import {
  halfSides,
  sides,
  chicken,
  chickenBreast,
  beef,
  seafood,
  appetizers,
} from "../data/data";
import { usePostHog } from "posthog-js/react";

const Home: NextPage = () => {
  const [halfSidesBool] = useState<boolean>(false);
  const { selectedItems, addItem, removeItem, resetItems } = useNutritionCalculator();
  const { showToast, toastText, showToastMessage, hideToast } = useToast();
  const posthog = usePostHog();

  const handleResetArray = useCallback(() => {
    resetItems();
  }, [resetItems]);


  const handleJumpToBottom = useCallback(() => {
    posthog.capture("jump_to_bottom");
  }, [posthog]);

  return (
    <>
      <Head>
        <title>{SEO_CONFIG.title}</title>
        <meta
          name="description"
          content={SEO_CONFIG.description}
        />

        <meta property="og:image:width" content={SEO_CONFIG.imageWidth} />
        <meta property="og:image:height" content={SEO_CONFIG.imageHeight} />
        <meta
          property="og:url"
          content={SEO_CONFIG.url}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={SEO_CONFIG.title}
        />
        <meta
          property="og:description"
          content={SEO_CONFIG.description}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
        <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />

        <meta name="twitter:image:width" content="1080" />
        <meta name="twitter:image:height" content="1080" />
        <meta
          name="twitter:url"
          content={SEO_CONFIG.url}
        />
        <meta name="twitter:type" content="website" />
        <meta
          name="twitter:title"
          content={SEO_CONFIG.title}
        />
        <meta
          name="twitter:description"
          content={SEO_CONFIG.description}
        />
        <meta
          name="google-site-verification"
          content={SEO_CONFIG.siteVerification}
        />
      </Head>
      <Header buttonClick={handleResetArray} />
      <main className="relative flex flex-col bg-gradient-to-r from-[#9d0208] to-[#370617]">
        <h1 className="py-4 text-center text-xl font-bold text-white underline">
          Panda Express Nutrition Info
        </h1>

        <p className="px-2 pt-4 text-center text-white md:pt-6">
          Click on the &quot;+&quot; to add an item to your list. List and total
          panda express macros found at bottom of page.
        </p>
        <p className="px-2 pb-4 text-center text-white md:pb-6">
          You can reset the selected items but click on the &quot;Reset
          Selected&quot; button in the header.
        </p>

        {halfSidesBool === false ? (
          <Table
            inputArray={sides}
            setItems={addItem}
            setToast={showToastMessage}
            headerText="Sides"
          />
        ) : (
          <Table
            inputArray={halfSides}
            setItems={addItem}
            setToast={showToastMessage}
            headerText="Sides"
          />
        )}
        <Table
          inputArray={chicken}
          setItems={addItem}
          setToast={showToastMessage}
          headerText="Chicken"
        />
        <Table
          inputArray={chickenBreast}
          setItems={addItem}
          setToast={showToastMessage}
          headerText="Chicken Breast"
        />
        <Table
          inputArray={beef}
          setItems={addItem}
          setToast={showToastMessage}
          headerText="Beef"
        />
        <Table
          inputArray={seafood}
          setItems={addItem}
          setToast={showToastMessage}
          headerText="Seafood"
        />
        <Table
          inputArray={appetizers}
          setItems={addItem}
          setToast={showToastMessage}
          headerText="Appetizers"
        />

        <ResultTable removeItem={removeItem} inputArray={selectedItems} />

        {showToast && (
          <div className="fixed left-[50%] bottom-[20px] translate-x-[-50%]">
            <Toast itemName={toastText} setShowToast={hideToast} />
          </div>
        )}

        <p className="pt-4 text-center text-white md:pt-6">
          *Not an official Panda Express website.
        </p>
        <p className="pb-4 text-center text-white md:pb-6">
          All information from Panda Express at{" "}
          <a
            className="text-yellow-500"
            href="https://www.pandaexpress.com/nutritioninformation"
          >
            www.pandaexpress.com
          </a>
        </p>

        <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6">
          <a href="#results">
            <button
              className="button hover:bg-800 h-14 w-14 rounded-full bg-gray-400 text-white"
              onClick={handleJumpToBottom}
            >
              <Image
                src="down-arrow-svgrepo-com.svg"
                width={ICON_SIZES.large.width}
                height={ICON_SIZES.large.height}
                alt={SR_TEXT.downArrow}
                className="mx-auto"
              />
            </button>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
