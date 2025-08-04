import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ResultTable from "~/components/resultTable";
import Toast from "~/components/toast";
import Toggle from "~/components/toggle";
import CategoryNavigation, { type CategoryData } from "~/components/categoryNavigation";
import CategorySection from "~/components/categorySection";
import FloatingSelectionSummary from "~/components/floatingSelectionSummary";
import AlertBanner from "~/components/alertBanner";
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
  const [halfSidesBool, setHalfSidesBool] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("sides");
  const { 
    selectedItems, 
    selectedQuantifiedItems, 
    totalItemCount, 
    totalQuantity, 
    addItem,
    removeItemByKey, 
    incrementQuantity, 
    decrementQuantity, 
    updateQuantity, 
    resetItems 
  } = useNutritionCalculator();
  const { showToast, toastText, showToastMessage, hideToast } = useToast();
  const posthog = usePostHog();

  // Refs for category sections
  const sidesRef = useRef<HTMLDivElement>(null);
  const chickenRef = useRef<HTMLDivElement>(null);
  const chickenBreastRef = useRef<HTMLDivElement>(null);
  const beefRef = useRef<HTMLDivElement>(null);
  const seafoodRef = useRef<HTMLDivElement>(null);
  const appetizersRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResetArray = useCallback(() => {
    resetItems();
  }, [resetItems]);

  const handleToggleHalfSides = useCallback((checked: boolean) => {
    setHalfSidesBool(checked);
    posthog.capture("toggle_half_sides", { half_sides: checked });
  }, [posthog]);

  const handleJumpToBottom = useCallback(() => {
    posthog.capture("jump_to_bottom");
  }, [posthog]);

  // Create category data with dynamic sides based on toggle
  const categories: CategoryData[] = [
    {
      id: "sides",
      name: "sides",
      displayName: "Sides",
      items: halfSidesBool ? halfSides : sides,
    },
    {
      id: "chicken",
      name: "chicken",
      displayName: "Chicken",
      items: chicken,
    },
    {
      id: "chickenBreast",
      name: "chickenBreast",
      displayName: "Chicken Breast",
      items: chickenBreast,
    },
    {
      id: "beef",
      name: "beef",
      displayName: "Beef",
      items: beef,
    },
    {
      id: "seafood",
      name: "seafood",
      displayName: "Seafood",
      items: seafood,
    },
    {
      id: "appetizers",
      name: "appetizers",
      displayName: "Appetizers",
      items: appetizers,
    },
  ];

  const handleCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    posthog.capture("category_navigation", { category: categoryId });
    
    // Scroll to the corresponding section
    const refs = {
      sides: sidesRef,
      chicken: chickenRef,
      chickenBreast: chickenBreastRef,
      beef: beefRef,
      seafood: seafoodRef,
      appetizers: appetizersRef,
    };
    
    const targetRef = refs[categoryId as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [posthog]);

  const handleViewResults = useCallback(() => {
    posthog.capture("view_results_from_floating_summary");
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
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
      <AlertBanner />
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

        {/* Category Navigation - Mobile Only */}
        <CategoryNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          className="block md:hidden"
        />

        <div className="mx-4 mb-4 flex justify-center md:mx-auto">
          <Toggle
            checked={halfSidesBool}
            onChange={handleToggleHalfSides}
            label="Half Sides"
            description="Toggle to show half portion sizes for sides"
            size="md"
            className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          />
        </div>

        {/* Category Sections with Responsive Layout */}
        <CategorySection
          ref={sidesRef}
          id="sides"
          title="Sides"
          items={halfSidesBool ? halfSides : sides}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <CategorySection
          ref={chickenRef}
          id="chicken"
          title="Chicken"
          items={chicken}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <CategorySection
          ref={chickenBreastRef}
          id="chickenBreast"
          title="Chicken Breast"
          items={chickenBreast}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <CategorySection
          ref={beefRef}
          id="beef"
          title="Beef"
          items={beef}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <CategorySection
          ref={seafoodRef}
          id="seafood"
          title="Seafood"
          items={seafood}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <CategorySection
          ref={appetizersRef}
          id="appetizers"
          title="Appetizers"
          items={appetizers}
          selectedItems={selectedItems}
          onAddItem={addItem}
          onToast={showToastMessage}
        />

        <div ref={resultsRef}>
          <ResultTable 
            inputArray={selectedItems} 
            quantifiedItems={selectedQuantifiedItems}
            removeItemByKey={removeItemByKey}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            updateQuantity={updateQuantity}
          />
        </div>

        {/* Toast Notifications */}
        {showToast && (
          <div className="fixed left-[50%] bottom-[20px] translate-x-[-50%] z-50">
            <Toast itemName={toastText} setShowToast={hideToast} />
          </div>
        )}

        {/* Floating Selection Summary - Mobile */}
        <FloatingSelectionSummary
          selectedItems={selectedItems}
          totalItemCount={totalItemCount}
          totalQuantity={totalQuantity}
          onViewResults={handleViewResults}
          className="block md:hidden"
        />

        {/* Desktop Floating Button - Hidden on Mobile */}
        <div className="hidden md:block fixed right-4 bottom-4 sm:right-6 sm:bottom-6">
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
