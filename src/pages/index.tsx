import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ResultTable from "~/components/resultTable";
import Toast from "~/components/toast";
import Toggle from "~/components/toggle";
import CategoryNavigation, {
  type CategoryData,
} from "~/components/categoryNavigation";
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
    resetItems,
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

  const handleToggleHalfSides = useCallback(
    (checked: boolean) => {
      setHalfSidesBool(checked);
      posthog.capture("toggle_half_sides", { half_sides: checked });
    },
    [posthog],
  );

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

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
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
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [posthog],
  );

  const handleViewResults = useCallback(() => {
    posthog.capture("view_results_from_floating_summary");
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [posthog]);

  return (
    <>
      <Head>
        <title>{SEO_CONFIG.title}</title>
        <meta name="description" content={SEO_CONFIG.description} />
        <meta name="keywords" content={SEO_CONFIG.keywords} />
        <meta name="author" content={SEO_CONFIG.author} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={SEO_CONFIG.url} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content={SEO_CONFIG.type} />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />
        <meta property="og:title" content={SEO_CONFIG.title} />
        <meta property="og:description" content={SEO_CONFIG.description} />
        <meta property="og:url" content={SEO_CONFIG.url} />
        <meta property="og:image" content={SEO_CONFIG.imageUrl} />
        <meta property="og:image:width" content={SEO_CONFIG.imageWidth} />
        <meta property="og:image:height" content={SEO_CONFIG.imageHeight} />
        <meta
          property="og:image:alt"
          content="Panda Express Nutrition Calculator - Calculate calories, protein, carbs and fat for your meal"
        />
        <meta property="og:locale" content={SEO_CONFIG.locale} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_CONFIG.title} />
        <meta name="twitter:description" content={SEO_CONFIG.description} />
        <meta name="twitter:image" content={SEO_CONFIG.imageUrl} />
        <meta
          name="twitter:image:alt"
          content="Panda Express Nutrition Calculator - Calculate calories, protein, carbs and fat for your meal"
        />

        {/* Additional SEO Meta Tags */}
        <meta
          name="google-site-verification"
          content={SEO_CONFIG.siteVerification}
        />
        <meta name="theme-color" content="#9d0208" />
        <meta name="msapplication-TileColor" content="#9d0208" />
        <meta name="format-detection" content="telephone=no" />

        {/* Enhanced Food & Nutrition Meta Tags */}
        <meta name="food-type" content="Chinese American Fast Food" />
        <meta
          name="nutrition-focus"
          content="Calories, Protein, Carbohydrates, Fat"
        />
        <meta
          name="diet-categories"
          content="Macro Tracking, Calorie Counting, Weight Loss, Bodybuilding"
        />
        <meta
          name="popular-items"
          content="Orange Chicken, Chow Mein, Fried Rice, Beijing Beef, Honey Walnut Shrimp"
        />
        <meta
          name="application-use"
          content="Meal Planning, Diet Tracking, Nutrition Analysis"
        />

        {/* Geo-targeting and Language Meta Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en-US" />

        {/* Mobile and Performance Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Panda Nutrition" />

        {/* Structured Meta for Rich Snippets */}
        <meta name="rating" content="5" />
        <meta name="review-count" content="1000+" />
        <meta name="price" content="Free" />
        <meta name="availability" content="Available" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Panda Express Nutrition Calculator",
              url: SEO_CONFIG.url,
              description: SEO_CONFIG.description,
              applicationCategory: "HealthApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: SEO_CONFIG.author,
              },
              provider: {
                "@type": "Organization",
                name: "Panda Express Nutrition Calculator",
                url: SEO_CONFIG.url,
              },
              keywords: SEO_CONFIG.keywords.split(", "),
              screenshot: SEO_CONFIG.imageUrl,
              softwareVersion: "1.0",
              releaseNotes:
                "Free Panda Express nutrition calculator and macro tracker",
            }),
          }}
        />

        {/* Structured Data - Nutrition Information */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              name: "Panda Express Menu Nutrition Information",
              description:
                "Comprehensive nutrition data for all Panda Express menu items including calories, protein, carbohydrates, and fat content",
              url: SEO_CONFIG.url,
              keywords: [
                "panda express",
                "nutrition",
                "calories",
                "protein",
                "carbs",
                "fat",
                "macro calculator",
              ],
              creator: {
                "@type": "Person",
                name: SEO_CONFIG.author,
              },
              publisher: {
                "@type": "Organization",
                name: "Panda Express Nutrition Calculator",
              },
              distribution: {
                "@type": "DataDownload",
                contentUrl: SEO_CONFIG.url,
                encodingFormat: "text/html",
              },
              temporalCoverage: "2024",
              spatialCoverage: {
                "@type": "Place",
                name: "United States",
              },
            }),
          }}
        />

        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I calculate Panda Express nutrition information?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Use our free Panda Express nutrition calculator to select menu items and automatically calculate total calories, protein, carbohydrates, and fat for your meal. Simply click the '+' button next to any menu item to add it to your selection.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What nutrition information is available for Panda Express menu items?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our calculator provides calories, protein, carbohydrates, and fat content for all major Panda Express menu items including Orange Chicken, Chow Mein, Fried Rice, Beijing Beef, Honey Walnut Shrimp, and all sides and appetizers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I track macros for my Panda Express meal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Our Panda Express macro calculator automatically totals the protein, carbohydrates, and fat (macronutrients) for your selected items, making it easy to track your daily macro goals.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many calories are in Orange Chicken?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Panda Express Orange Chicken contains 490 calories per serving, with 25g protein, 51g carbohydrates, and 23g fat. It's one of the most popular menu items.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which Panda Express items are lowest in calories?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Super Greens is the lowest calorie side at 90 calories. For entrees, Broccoli Beef (150 cal), Potato Chicken (190 cal), and Wok-Fried Shrimp (190 cal) are among the lowest calorie options.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the highest protein Panda Express items?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The highest protein items are Teriyaki Chicken and Asian Chicken with 41g protein each, followed by Grilled Teriyaki Chicken and Grilled Asian Chicken with 33g protein each.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Structured Data - Menu Items Collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Panda Express Menu Nutrition Information",
              description:
                "Complete nutrition facts for all Panda Express menu items",
              itemListElement: [
                {
                  "@type": "Recipe",
                  position: 1,
                  name: "Orange Chicken",
                  description:
                    "Panda Express signature Orange Chicken with sweet and tangy orange sauce",
                  nutrition: {
                    "@type": "NutritionInformation",
                    calories: "490 calories",
                    proteinContent: "25g",
                    carbohydrateContent: "51g",
                    fatContent: "23g",
                  },
                  recipeCategory: "Chinese American",
                  recipeCuisine: "Asian",
                },
                {
                  "@type": "Recipe",
                  position: 2,
                  name: "Chow Mein",
                  description:
                    "Stir-fried noodles with vegetables and seasonings",
                  nutrition: {
                    "@type": "NutritionInformation",
                    calories: "510 calories",
                    proteinContent: "13g",
                    carbohydrateContent: "80g",
                    fatContent: "20g",
                  },
                  recipeCategory: "Chinese American",
                  recipeCuisine: "Asian",
                },
                {
                  "@type": "Recipe",
                  position: 3,
                  name: "Fried Rice",
                  description:
                    "Wok-fried rice with egg, peas, carrots and green onions",
                  nutrition: {
                    "@type": "NutritionInformation",
                    calories: "520 calories",
                    proteinContent: "11g",
                    carbohydrateContent: "85g",
                    fatContent: "16g",
                  },
                  recipeCategory: "Chinese American",
                  recipeCuisine: "Asian",
                },
                {
                  "@type": "Recipe",
                  position: 4,
                  name: "Beijing Beef",
                  description:
                    "Crispy beef with bell peppers and onions in sweet and tangy sauce",
                  nutrition: {
                    "@type": "NutritionInformation",
                    calories: "480 calories",
                    proteinContent: "14g",
                    carbohydrateContent: "46g",
                    fatContent: "27g",
                  },
                  recipeCategory: "Chinese American",
                  recipeCuisine: "Asian",
                },
                {
                  "@type": "Recipe",
                  position: 5,
                  name: "Honey Walnut Shrimp",
                  description:
                    "Crispy shrimp with candied walnuts and creamy sauce",
                  nutrition: {
                    "@type": "NutritionInformation",
                    calories: "360 calories",
                    proteinContent: "11g",
                    carbohydrateContent: "27g",
                    fatContent: "24g",
                  },
                  recipeCategory: "Chinese American",
                  recipeCuisine: "Asian",
                },
              ],
            }),
          }}
        />

        {/* Structured Data - Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SEO_CONFIG.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Panda Express Nutrition Calculator",
                  item: SEO_CONFIG.url,
                },
              ],
            }),
          }}
        />

        {/* Structured Data - Local Business/Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Panda Express Nutrition Calculator",
              url: SEO_CONFIG.url,
              logo: SEO_CONFIG.imageUrl,
              description:
                "Free online nutrition calculator and macro tracker for Panda Express menu items. Calculate calories, protein, carbs, and fat for meal planning and diet tracking.",
              sameAs: ["https://twitter.com/BlakeTomasz"],
              foundingDate: "2024",
              knowsAbout: [
                "Panda Express Nutrition",
                "Macro Calculation",
                "Calorie Counting",
                "Diet Tracking",
                "Nutrition Facts",
                "Chinese Food Nutrition",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Nutrition Calculation Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Panda Express Nutrition Calculator",
                      description:
                        "Free online tool to calculate nutrition information for Panda Express meals",
                    },
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                  },
                ],
              },
            }),
          }}
        />
      </Head>
      <AlertBanner />
      <Header buttonClick={handleResetArray} />
      <main className="relative flex flex-col bg-gradient-to-r from-[#9d0208] to-[#370617]">
        <header
          className="py-6 text-center"
          itemScope
          itemType="https://schema.org/WebApplication"
        >
          <h1
            className="mb-4 text-2xl font-bold text-white md:text-3xl"
            itemProp="name"
          >
            Panda Express Nutrition Calculator
          </h1>
          <p className="mb-2 px-4 text-lg text-white/90" itemProp="description">
            Calculate calories, protein, carbs & fat for your Panda Express meal
          </p>
          <p className="px-4 text-sm text-white/80">
            Free macro calculator with complete nutrition facts for all menu
            items including Orange Chicken, Chow Mein, Beijing Beef, and Honey
            Walnut Shrimp
          </p>
          <div className="mt-4 px-4 text-xs text-white/70">
            <span className="mx-1 inline-block">
              🔥 Most searched: Orange Chicken calories
            </span>
            <span className="mx-1 inline-block">
              💪 Highest protein: Teriyaki Chicken
            </span>
            <span className="mx-1 inline-block">
              🥗 Lowest calorie: Super Greens
            </span>
          </div>
        </header>

        <section
          className="px-4 py-4"
          aria-label="Instructions"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-3 font-semibold text-white/90" itemProp="name">
              How to Calculate Panda Express Nutrition Information
            </h2>
            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div
                className="rounded-lg bg-black/20 p-3"
                itemProp="step"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="mb-1 font-bold text-yellow-400" itemProp="name">
                  Step 1: Select Items
                </div>
                <p className="text-xs text-white/80" itemProp="text">
                  Browse menu categories and click the &quot;+&quot; button to
                  add items like Orange Chicken, Chow Mein, or Fried Rice to
                  your meal
                </p>
              </div>
              <div
                className="rounded-lg bg-black/20 p-3"
                itemProp="step"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="mb-1 font-bold text-yellow-400" itemProp="name">
                  Step 2: View Totals
                </div>
                <p className="text-xs text-white/80" itemProp="text">
                  See your total calories, protein, carbs, and fat automatically
                  calculated in the meal summary section
                </p>
              </div>
              <div
                className="rounded-lg bg-black/20 p-3"
                itemProp="step"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="mb-1 font-bold text-yellow-400" itemProp="name">
                  Step 3: Track Macros
                </div>
                <p className="text-xs text-white/80" itemProp="text">
                  Use the nutrition totals for meal planning, macro counting, or
                  diet tracking goals
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/70">
              Perfect for weight loss, bodybuilding, keto diet, or anyone
              wanting to make healthier Panda Express choices
            </p>
          </div>
        </section>

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
            className="rounded-lg border border-white/20 bg-black/20 p-4 backdrop-blur-sm"
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

        <section
          ref={resultsRef}
          id="results"
          aria-label="Selected Items and Nutrition Totals"
          itemScope
          itemType="https://schema.org/NutritionInformation"
        >
          <div className="mb-4 px-4">
            <h2
              className="mb-2 text-center text-xl font-bold text-white md:text-2xl"
              itemProp="name"
            >
              Your Panda Express Meal Summary
            </h2>
            <p className="text-center text-sm text-white/80">
              Total calories, macronutrients, and nutrition facts for your
              selected items
            </p>
            <div className="mx-auto mt-4 max-w-4xl">
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70 md:grid-cols-4">
                <div className="rounded bg-black/20 p-2 text-center">
                  <div className="font-semibold text-yellow-300">
                    Daily Values
                  </div>
                  <div>Based on 2000 calorie diet</div>
                </div>
                <div className="rounded bg-black/20 p-2 text-center">
                  <div className="font-semibold text-yellow-300">
                    Macro Split
                  </div>
                  <div>Protein/Carbs/Fat ratio</div>
                </div>
                <div className="rounded bg-black/20 p-2 text-center">
                  <div className="font-semibold text-yellow-300">Meal Size</div>
                  <div>Individual vs Family</div>
                </div>
                <div className="rounded bg-black/20 p-2 text-center">
                  <div className="font-semibold text-yellow-300">
                    Diet Goals
                  </div>
                  <div>Weight loss/maintenance</div>
                </div>
              </div>
            </div>
          </div>
          <ResultTable
            inputArray={selectedItems}
            quantifiedItems={selectedQuantifiedItems}
            removeItemByKey={removeItemByKey}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            updateQuantity={updateQuantity}
          />
        </section>

        {/* Toast Notifications */}
        {showToast && (
          <div className="fixed bottom-[20px] left-[50%] z-50 translate-x-[-50%]">
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
        <div className="fixed bottom-4 right-4 hidden sm:bottom-6 sm:right-6 md:block">
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

        <footer className="mt-8 px-4 py-6 text-center">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-4 text-lg font-semibold text-white">
              About This Panda Express Nutrition Calculator
            </h3>
            <div className="mb-6 space-y-3 text-sm text-white/90">
              <p>
                Our free Panda Express nutrition calculator helps you make
                informed dining choices by providing accurate calorie counts and
                macro information for all menu items. Track protein,
                carbohydrates, and fat content to meet your dietary goals and
                fitness objectives.
              </p>
              <p>
                Whether you&apos;re counting macros for bodybuilding, managing
                calories for weight loss, or following a specific diet plan,
                this tool makes it easy to calculate the nutritional value of
                your Panda Express meal before you order. Perfect for meal prep
                planning and staying on track with your nutrition goals.
              </p>
            </div>

            <div className="mb-6 grid gap-4 text-xs text-white/80 md:grid-cols-2">
              <div className="rounded-lg bg-black/20 p-3">
                <h4 className="mb-2 font-semibold text-white">
                  Lowest Calorie Options
                </h4>
                <ul className="space-y-1 text-left">
                  <li>• Super Greens: 90 calories (6g protein)</li>
                  <li>• Broccoli Beef: 150 calories (9g protein)</li>
                  <li>• Potato Chicken: 190 calories (8g protein)</li>
                  <li>• Wok-Fried Shrimp: 190 calories (17g protein)</li>
                </ul>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <h4 className="mb-2 font-semibold text-white">
                  Highest Protein Options
                </h4>
                <ul className="space-y-1 text-left">
                  <li>• Teriyaki Chicken: 41g protein (340 cal)</li>
                  <li>• Asian Chicken: 41g protein (340 cal)</li>
                  <li>• Grilled Teriyaki: 33g protein (275 cal)</li>
                  <li>• Grilled Asian: 33g protein (275 cal)</li>
                </ul>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-black/20 p-4 text-xs text-white/80">
              <h4 className="mb-2 font-semibold text-white">
                Macro-Friendly Meal Combinations
              </h4>
              <div className="grid gap-3 text-left md:grid-cols-3">
                <div>
                  <strong className="text-yellow-300">
                    Weight Loss (Under 600 cal):
                  </strong>
                  <p>Super Greens + Grilled Teriyaki Chicken = 365 calories</p>
                </div>
                <div>
                  <strong className="text-yellow-300">Balanced Macro:</strong>
                  <p>
                    Brown Rice + Orange Chicken = 910 calories (34g protein)
                  </p>
                </div>
                <div>
                  <strong className="text-yellow-300">High Protein:</strong>
                  <p>
                    Super Greens + Teriyaki Chicken = 430 calories (47g protein)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/20 pt-4 text-xs text-white/70">
              <p>
                <strong>Most searched items:</strong> How many calories in Panda
                Express Orange Chicken (490 cal), Chow Mein nutrition facts (510
                cal), Fried Rice calorie content (520 cal), Beijing Beef macro
                information (480 cal), Honey Walnut Shrimp calories (360 cal)
              </p>
              <p>
                <strong>Diet-friendly options:</strong> Use our calculator to
                find the best Panda Express items for keto, low-carb,
                high-protein, and weight loss diets. Compare nutrition facts
                across all menu categories.
              </p>
              <p>
                *Not affiliated with Panda Express. Nutrition data sourced from{" "}
                <a
                  className="text-yellow-400 underline hover:text-yellow-300"
                  href="https://www.pandaexpress.com/nutritioninformation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Official Panda Express nutrition information (opens in new tab)"
                >
                  official Panda Express nutrition information
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
};

export default Home;
