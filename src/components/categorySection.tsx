import { memo, forwardRef } from "react";
import { type FoodEntry, createFoodEntryKey } from "~/data/data";
import FoodCard from "./foodCard";
import Table from "./table";
import { usePostHog } from "posthog-js/react";

export interface CategorySectionProps {
  id: string;
  title: string;
  items: readonly FoodEntry[];
  selectedItems: readonly FoodEntry[];
  onAddItem: (item: FoodEntry) => void;
  onToast: (itemName: string) => void;
  className?: string;
}

const CategorySection = memo(forwardRef<HTMLDivElement, CategorySectionProps>(({
  id,
  title,
  items,
  selectedItems,
  onAddItem,
  onToast,
  className = "",
}, ref) => {
  const posthog = usePostHog();

  const handleAddItem = (item: FoodEntry) => {
    const key = createFoodEntryKey(item);
    const existingItemCount = selectedItems.filter(selected => createFoodEntryKey(selected) === key).length;
    const isNewItem = existingItemCount === 0;
    
    onAddItem(item);
    onToast(item.name);
    
    posthog.capture("item_added", {
      item_name: item.name,
      item_key: key,
      category: title,
      is_half_portion: item.isHalfPortion || false,
      was_new_item: isNewItem,
      new_quantity: existingItemCount + 1,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
    });
  };

  return (
    <section 
      ref={ref}
      id={id}
      className={`scroll-mt-20 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {/* Mobile Card Layout */}
      <div className="block md:hidden mx-4 mb-8">
        <h2 
          id={`${id}-heading`}
          className="text-2xl font-bold text-white mb-6 px-2"
        >
          {title}
        </h2>
        <div className="grid gap-4">
          {items.map((item) => (
            <FoodCard
              key={`card-${item.name}`}
              item={item}
              onAdd={handleAddItem}
            />
          ))}
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <Table
          inputArray={items}
          setItems={onAddItem}
          setToast={onToast}
          headerText={title}
        />
      </div>
    </section>
  );
}));

CategorySection.displayName = 'CategorySection';

export default CategorySection;