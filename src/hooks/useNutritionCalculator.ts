import { useState, useCallback, useMemo } from 'react';
import { type FoodEntry } from '~/data/data';

export type NutritionTotals = Readonly<FoodEntry>;

export interface UseNutritionCalculatorReturn {
  readonly selectedItems: readonly FoodEntry[];
  readonly nutritionTotals: NutritionTotals;
  readonly addItem: (item: FoodEntry) => void;
  readonly removeItem: (index: number) => void;
  readonly resetItems: () => void;
}

/**
 * Custom hook for managing nutrition calculations and selected items
 * @returns Object with selected items, totals, and management functions
 */
export const useNutritionCalculator = (): UseNutritionCalculatorReturn => {
  const [selectedItems, setSelectedItems] = useState<FoodEntry[]>([]);

  const addItem = useCallback((item: FoodEntry) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setSelectedItems((prevItems) => 
      prevItems.filter((_, idx) => idx !== index)
    );
  }, []);

  const resetItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const nutritionTotals = useMemo((): NutritionTotals => ({
    name: 'Sum',
    calories: selectedItems.reduce((sum, item) => sum + item.calories, 0),
    protein: selectedItems.reduce((sum, item) => sum + item.protein, 0),
    carbs: selectedItems.reduce((sum, item) => sum + item.carbs, 0),
    fat: selectedItems.reduce((sum, item) => sum + item.fat, 0),
  }), [selectedItems]);

  return {
    selectedItems,
    nutritionTotals,
    addItem,
    removeItem,
    resetItems,
  };
};