import { type FC, memo, useRef, useEffect } from "react";
import { type FoodEntry } from "~/data/data";

export interface CategoryData {
  id: string;
  name: string;
  items: readonly FoodEntry[];
  displayName: string;
}

export interface CategoryNavigationProps {
  categories: CategoryData[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

const CategoryNavigation: FC<CategoryNavigationProps> = memo(({
  categories,
  activeCategory,
  onCategorySelect,
  className = "",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active category
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      // Check if button is partially or fully out of view
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className={`sticky top-0 z-40 bg-gradient-to-r from-[#9d0208] to-[#370617] backdrop-blur-md border-b border-white/20 ${className}`}>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide py-3 px-4 gap-2 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              data-category={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                flex-shrink-0 snap-start min-h-[44px] px-4 py-2 rounded-full
                transition-all duration-200 ease-in-out
                flex items-center justify-center gap-2
                font-medium text-sm whitespace-nowrap
                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
                ${isActive 
                  ? 'bg-yellow-400 text-black shadow-lg scale-105' 
                  : 'bg-white/10 text-white hover:bg-white/20 active:bg-white/30'
                }
              `}
              aria-pressed={isActive}
              aria-label={`Navigate to ${category.displayName} category (${category.items.length} items)`}
            >
              <span>{category.displayName}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full font-bold
                ${isActive 
                  ? 'bg-black/20 text-black' 
                  : 'bg-white/20 text-white'
                }
              `}>
                {category.items.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;