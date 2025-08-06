// UI Constants
export const TOAST_DURATION = 3000;
export const SCROLL_BUTTON_SIZE = 14;

// API URLs
export const PANDA_EXPRESS_NUTRITION_URL =
  "https://www.pandaexpress.com/nutritioninformation";

// CSS Classes
export const TABLE_CLASSES = {
  container:
    "relative mx-4 flex flex-col shadow-md sm:min-w-[50%] sm:rounded-lg md:mx-auto",
  table: "w-full text-left text-sm text-gray-500",
  caption: "p-4 text-left text-2xl font-bold text-white md:p-6",
  headerDesktop:
    "hidden border-b bg-red-200 text-xs uppercase text-black md:table-header-group",
  headerMobile:
    "table-header-group border-b bg-red-200 text-xs uppercase text-black md:hidden",
  rowEven: "border-b bg-white font-medium text-black even:bg-red-50",
  rowSum: "border-b bg-red-200 font-medium text-black",
  cellName: "max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4",
  cellCenter: "p-2 text-center md:px-4 md:py-4",
  buttonAdd: "mx-auto font-medium text-green-600 hover:underline",
  buttonRemove: "font-medium text-red-700 hover:underline",
} as const;

// Meta Tags
export const SEO_CONFIG = {
  title:
    "Panda Express Nutrition Calculator | Calories, Macros & Nutrition Facts",
  description:
    "Calculate Panda Express nutrition information, calories, protein, carbs and fat for your meal. Free macro calculator with all menu items including Orange Chicken, Chow Mein, Fried Rice and more.",
  keywords:
    "panda express nutrition, panda express calories, panda express macro calculator, panda express nutrition facts, panda express menu nutrition, panda express protein content, panda express carbs, orange chicken calories, chow mein nutrition, fried rice calories, beijing beef nutrition, honey walnut shrimp calories, super greens nutrition, teriyaki chicken calories, kung pao chicken nutrition, broccoli beef calories, macro calculator, diet tracking, meal planning, calorie counter, chinese food nutrition, fast food nutrition, healthy eating, weight loss, bodybuilding nutrition, macronutrient tracking, carb counting, protein tracking, fat content",
  url: "https://panda-express-nutrition.vercel.app",
  siteName: "Panda Express Nutrition Calculator",
  imageUrl: "https://panda-express-nutrition.vercel.app/og-image.png",
  imageWidth: "1200",
  imageHeight: "630",
  siteVerification: "q89S_Dej4noVDW2XJtcU6BMcK9_sc-d2ohAKLLmawss",
  author: "Blake Barnhill",
  type: "website",
  locale: "en_US",
  additionalMeta: {
    foodFocus: "chinese american fast food nutrition calculator",
    targetAudience: "fitness enthusiasts, dieters, health-conscious consumers",
    primaryKeywords: [
      "panda express nutrition",
      "panda express calories",
      "macro calculator",
    ],
    secondaryKeywords: [
      "orange chicken calories",
      "chow mein nutrition",
      "beijing beef nutrition",
      "chinese food calories",
    ],
    longTailKeywords: [
      "how many calories in panda express orange chicken",
      "panda express lowest calorie items",
      "panda express highest protein items",
      "panda express macro friendly options",
      "panda express diet meal combinations",
      "healthy panda express meal ideas",
    ],
  },
} as const;

// Button and Icon Sizes
export const ICON_SIZES = {
  small: { width: 5, height: 5 },
  medium: { width: 8, height: 8 },
  large: { width: 14, height: 14 },
} as const;

// Screen Reader Text
export const SR_TEXT = {
  addToSelected: "Add to Selected",
  removeFromSelected: "Remove from Selected",
  checkIcon: "Check icon",
  close: "Close",
  downArrow: "Down arrow",
} as const;
