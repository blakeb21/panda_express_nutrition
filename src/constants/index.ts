// UI Constants
export const TOAST_DURATION = 3000;
export const SCROLL_BUTTON_SIZE = 14;

// API URLs
export const PANDA_EXPRESS_NUTRITION_URL = "https://www.pandaexpress.com/nutritioninformation";

// CSS Classes
export const TABLE_CLASSES = {
  container: "relative mx-4 flex flex-col shadow-md sm:min-w-[50%] sm:rounded-lg md:mx-auto",
  table: "w-full text-left text-sm text-gray-500",
  caption: "p-4 text-left text-2xl font-bold text-white md:p-6",
  headerDesktop: "hidden border-b bg-red-200 text-xs uppercase text-black md:table-header-group",
  headerMobile: "table-header-group border-b bg-red-200 text-xs uppercase text-black md:hidden",
  rowEven: "border-b bg-white font-medium text-black even:bg-red-50",
  rowSum: "border-b bg-red-200 font-medium text-black",
  cellName: "max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4",
  cellCenter: "p-2 text-center md:px-4 md:py-4",
  buttonAdd: "mx-auto font-medium text-green-600 hover:underline",
  buttonRemove: "font-medium text-red-700 hover:underline",
} as const;

// Meta Tags
export const SEO_CONFIG = {
  title: "Panda Express Nutrition Calculator",
  description: "A quick and easy way to calculate Panda Express nutrition information and macros",
  url: "https://panda-express-nutrition.vercel.app",
  imageWidth: "1080",
  imageHeight: "1080",
  twitterHandle: "@BlakeTomasz",
  siteVerification: "q89S_Dej4noVDW2XJtcU6BMcK9_sc-d2ohAKLLmawss",
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