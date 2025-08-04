import { useState, useCallback, useMemo } from 'react';
import { 
  type FoodEntry, 
  type QuantifiedFoodEntry,
  createQuantifiedEntry,
  updateNutritionByQuantity,
  createFoodEntryKey
} from '~/data/data';

export type NutritionTotals = Readonly<FoodEntry>;

export interface UseNutritionCalculatorReturn {
  readonly selectedItems: readonly FoodEntry[];
  readonly selectedQuantifiedItems: readonly QuantifiedFoodEntry[];
  readonly nutritionTotals: NutritionTotals;
  readonly totalItemCount: number;
  readonly totalQuantity: number;
  readonly addItem: (item: FoodEntry) => void;
  readonly removeItem: (index: number) => void;
  readonly removeItemByKey: (key: string) => void;
  readonly updateQuantity: (key: string, newQuantity: number) => void;
  readonly incrementQuantity: (key: string) => void;
  readonly decrementQuantity: (key: string) => void;
  readonly resetItems: () => void;
}

/**
 * Custom hook for managing nutrition calculations and selected items with quantity support
 * @returns Object with selected items, totals, and management functions
 */
export const useNutritionCalculator = (): UseNutritionCalculatorReturn => {
  const [quantifiedItemsMap, setQuantifiedItemsMap] = useState<Map<string, QuantifiedFoodEntry>>(new Map());

  // Convert quantified items map to arrays for backward compatibility
  const selectedQuantifiedItems = useMemo(() => {
    return Array.from(quantifiedItemsMap.values())
      .map(updateNutritionByQuantity)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [quantifiedItemsMap]);

  // Backward compatibility: flatten quantified items to regular FoodEntry array
  const selectedItems = useMemo((): FoodEntry[] => {
    const items: FoodEntry[] = [];
    selectedQuantifiedItems.forEach(quantifiedItem => {
      for (let i = 0; i < quantifiedItem.quantity; i++) {
        items.push({
          name: quantifiedItem.name,
          calories: quantifiedItem.baseCalories,
          protein: quantifiedItem.baseProtein,
          carbs: quantifiedItem.baseCarbs,
          fat: quantifiedItem.baseFat,
          isHalfPortion: quantifiedItem.isHalfPortion ?? false,
        });
      }
    });
    return items;
  }, [selectedQuantifiedItems]);

  const addItem = useCallback((item: FoodEntry) => {
    const key = createFoodEntryKey(item);
    setQuantifiedItemsMap((prevMap) => {
      const newMap = new Map(prevMap);
      const existingItem = newMap.get(key);
      
      if (existingItem) {
        // Increment quantity of existing item
        newMap.set(key, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        // Add new item with quantity 1
        newMap.set(key, createQuantifiedEntry(item));
      }
      
      return newMap;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    // Backward compatibility: remove by flattened array index
    if (index < 0) return;
    
    let currentIndex = 0;
    const targetKey = selectedQuantifiedItems.find(quantifiedItem => {
      const itemRange = currentIndex + quantifiedItem.quantity;
      if (index >= currentIndex && index < itemRange) {
        return true;
      }
      currentIndex = itemRange;
      return false;
    })?.key;

    if (targetKey) {
      setQuantifiedItemsMap((prevMap) => {
        const newMap = new Map(prevMap);
        const existingItem = newMap.get(targetKey);
        
        if (existingItem) {
          if (existingItem.quantity <= 1) {
            newMap.delete(targetKey);
          } else {
            newMap.set(targetKey, {
              ...existingItem,
              quantity: existingItem.quantity - 1,
            });
          }
        }
        
        return newMap;
      });
    }
  }, [selectedQuantifiedItems]);

  const removeItemByKey = useCallback((key: string) => {
    setQuantifiedItemsMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const updateQuantity = useCallback((key: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemByKey(key);
      return;
    }

    setQuantifiedItemsMap((prevMap) => {
      const newMap = new Map(prevMap);
      const existingItem = newMap.get(key);
      
      if (existingItem) {
        newMap.set(key, {
          ...existingItem,
          quantity: Math.max(1, Math.min(99, newQuantity)), // Limit quantity between 1-99
        });
      }
      
      return newMap;
    });
  }, [removeItemByKey]);

  const incrementQuantity = useCallback((key: string) => {
    setQuantifiedItemsMap((prevMap) => {
      const newMap = new Map(prevMap);
      const existingItem = newMap.get(key);
      
      if (existingItem && existingItem.quantity < 99) {
        newMap.set(key, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      }
      
      return newMap;
    });
  }, []);

  const decrementQuantity = useCallback((key: string) => {
    setQuantifiedItemsMap((prevMap) => {
      const newMap = new Map(prevMap);
      const existingItem = newMap.get(key);
      
      if (existingItem) {
        if (existingItem.quantity <= 1) {
          newMap.delete(key);
        } else {
          newMap.set(key, {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          });
        }
      }
      
      return newMap;
    });
  }, []);

  const resetItems = useCallback(() => {
    setQuantifiedItemsMap(new Map());
  }, []);

  const nutritionTotals = useMemo((): NutritionTotals => ({
    name: 'Sum',
    calories: selectedQuantifiedItems.reduce((sum, item) => sum + item.calories, 0),
    protein: selectedQuantifiedItems.reduce((sum, item) => sum + item.protein, 0),
    carbs: selectedQuantifiedItems.reduce((sum, item) => sum + item.carbs, 0),
    fat: selectedQuantifiedItems.reduce((sum, item) => sum + item.fat, 0),
  }), [selectedQuantifiedItems]);

  const totalItemCount = useMemo(() => selectedQuantifiedItems.length, [selectedQuantifiedItems]);
  const totalQuantity = useMemo(() => 
    selectedQuantifiedItems.reduce((sum, item) => sum + item.quantity, 0), 
    [selectedQuantifiedItems]
  );

  return {
    selectedItems,
    selectedQuantifiedItems,
    nutritionTotals,
    totalItemCount,
    totalQuantity,
    addItem,
    removeItem,
    removeItemByKey,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    resetItems,
  };
};