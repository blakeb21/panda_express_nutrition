import { type FC, memo } from "react";
import { type FoodEntry } from "~/data/data";

export interface FloatingSelectionSummaryProps {
  selectedItems: readonly FoodEntry[];
  totalItemCount: number;
  totalQuantity: number;
  onViewResults: () => void;
  className?: string;
}

const FloatingSelectionSummary: FC<FloatingSelectionSummaryProps> = memo(({
  selectedItems,
  totalItemCount,
  totalQuantity,
  onViewResults,
  className = "",
}) => {
  const totalCalories = selectedItems.reduce((sum, item) => sum + item.calories, 0);

  // Don't show if no items selected
  if (totalItemCount === 0) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}>
      <button
        onClick={onViewResults}
        className="
          w-full min-h-[56px] px-4 py-3 
          bg-gradient-to-r from-yellow-400 to-yellow-500
          hover:from-yellow-500 hover:to-yellow-600
          active:from-yellow-600 active:to-yellow-700
          text-black font-bold text-lg
          rounded-2xl shadow-lg
          backdrop-blur-md
          border border-yellow-300/50
          transition-all duration-200 ease-in-out
          transform hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-4 focus:ring-yellow-400/50
          flex items-center justify-between
        "
        aria-label={`View selected items: ${totalItemCount} unique item${totalItemCount !== 1 ? 's' : ''}, ${totalQuantity} total quantity, ${totalCalories} total calories`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-black/20 rounded-full p-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-base font-bold">
              {totalItemCount} item{totalItemCount !== 1 ? 's' : ''} ({totalQuantity} total)
            </div>
            <div className="text-sm font-medium opacity-80">
              {totalCalories.toLocaleString()} calories
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm font-medium">View Results</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </button>
    </div>
  );
});

FloatingSelectionSummary.displayName = 'FloatingSelectionSummary';

export default FloatingSelectionSummary;