import { type FC, memo, useCallback } from "react";
import { type FoodEntry } from "~/data/data";

export interface FoodCardProps {
  item: FoodEntry;
  onAdd: (item: FoodEntry) => void;
  className?: string;
}

const FoodCard: FC<FoodCardProps> = memo(({
  item,
  onAdd,
  className = "",
}) => {
  const handleAdd = useCallback(() => {
    onAdd(item);
  }, [item, onAdd]);

  return (
    <div className={`
      bg-white rounded-2xl shadow-md border border-gray-200
      p-4 transition-all duration-200 ease-in-out
      hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
      ${className}
    `}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-3 line-clamp-2">
            {item.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Calories
              </div>
              <div className="text-lg font-bold text-red-600">
                {item.calories}
              </div>
            </div>
            
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Protein
              </div>
              <div className="text-lg font-bold text-blue-600">
                {item.protein}g
              </div>
            </div>
            
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Carbs
              </div>
              <div className="text-lg font-bold text-green-600">
                {item.carbs}g
              </div>
            </div>
            
            <div className="text-center p-2 bg-yellow-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Fat
              </div>
              <div className="text-lg font-bold text-yellow-600">
                {item.fat}g
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleAdd}
        className="
          w-full min-h-[44px] px-4 py-3
          bg-gradient-to-r from-green-500 to-green-600
          hover:from-green-600 hover:to-green-700
          active:from-green-700 active:to-green-800
          text-white font-bold text-base
          rounded-xl shadow-md
          transition-all duration-200 ease-in-out
          transform hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-4 focus:ring-green-400/50
          flex items-center justify-center gap-2
        "
        aria-label={`Add ${item.name} to your selection`}
      >
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
        <span>Add to Order</span>
      </button>
    </div>
  );
});

FoodCard.displayName = 'FoodCard';

export default FoodCard;