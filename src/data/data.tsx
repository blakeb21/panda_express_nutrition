export interface FoodEntry {
    readonly name: string;
    readonly calories: number;
    readonly protein: number;
    readonly carbs: number;
    readonly fat: number;
    readonly isHalfPortion?: boolean;
}

/**
 * Extended interface for tracking quantity of food entries
 * Maintains base nutrition values for accurate calculations
 */
export interface QuantifiedFoodEntry extends FoodEntry {
    readonly quantity: number;
    readonly baseCalories: number;
    readonly baseProtein: number;
    readonly baseCarbs: number;
    readonly baseFat: number;
    readonly key: string; // Unique identifier for grouping (name + portion type)
}

/**
 * Creates a half-portion version of a food entry
 * @param entry - The original food entry
 * @returns A new food entry with half the nutritional values
 */
export const createHalfPortion = (entry: FoodEntry): FoodEntry => ({
    name: entry.name,
    calories: entry.calories / 2,
    protein: entry.protein / 2,
    carbs: entry.carbs / 2,
    fat: entry.fat / 2,
    isHalfPortion: true,
} as const);

/**
 * Creates half-portion versions of an array of food entries
 * @param entries - Array of original food entries
 * @returns Array of food entries with half the nutritional values
 */
export const createHalfPortions = (entries: readonly FoodEntry[]): FoodEntry[] => 
    entries.map(createHalfPortion);

/**
 * Creates a unique key for grouping food entries
 * Combines name and portion type for accurate deduplication
 */
export const createFoodEntryKey = (entry: FoodEntry): string => {
    const portionSuffix = entry.isHalfPortion ? '_half' : '_full';
    return `${entry.name}${portionSuffix}`;
};

/**
 * Converts a regular FoodEntry to a QuantifiedFoodEntry with quantity 1
 * @param entry - The original food entry
 * @returns A quantified food entry with quantity 1
 */
export const createQuantifiedEntry = (entry: FoodEntry): QuantifiedFoodEntry => ({
    ...entry,
    quantity: 1,
    baseCalories: entry.calories,
    baseProtein: entry.protein,
    baseCarbs: entry.carbs,
    baseFat: entry.fat,
    key: createFoodEntryKey(entry),
});

/**
 * Updates the displayed nutrition values based on quantity
 * @param entry - The quantified food entry
 * @returns Updated entry with nutrition values multiplied by quantity
 */
export const updateNutritionByQuantity = (entry: QuantifiedFoodEntry): QuantifiedFoodEntry => ({
    ...entry,
    calories: entry.baseCalories * entry.quantity,
    protein: entry.baseProtein * entry.quantity,
    carbs: entry.baseCarbs * entry.quantity,
    fat: entry.baseFat * entry.quantity,
});

export const sides: readonly FoodEntry[] = [
    {name: "Chow Mein", calories: 510, protein: 13, carbs: 80, fat: 20},
    {name: "Fried Rice", calories: 520, protein: 11, carbs: 85, fat: 16},
    {name: "Brown Steamed Rice", calories: 420, protein: 9, carbs: 86, fat: 4},
    {name: "White Steamed Rice", calories: 380, protein: 7, carbs: 87, fat: 0},
    {name: "Super Greens", calories: 90, protein: 6, carbs: 10, fat: 3},
    {name: "Chow Fun", calories: 410, protein: 9, carbs: 73, fat: 9},
]

export const halfSides: readonly FoodEntry[] = createHalfPortions(sides);

export const chicken: readonly FoodEntry[] = [
    {name: "Black Pepper Chicken", calories: 280, protein: 13, carbs: 15, fat: 19},
    {name: "Kung Pao Chicken", calories: 290, protein: 16, carbs: 14, fat: 19},
    {name: "Grilled Teriyaki Chicken", calories: 275, protein: 33, carbs: 14, fat: 10},
    {name: "Grilled Asian Chicken", calories: 275, protein: 33, carbs: 14, fat: 10},
    {name: "Teryaki Chicken", calories: 340, protein: 41, carbs: 14, fat: 13},
    {name: "Asain Chicken", calories: 340, protein: 41, carbs: 14, fat: 13},
    {name: "Mushroom Chicken", calories: 220, protein: 13, carbs: 10, fat: 14},
    {name: "Orange Chicken", calories: 490, protein: 25, carbs: 51, fat: 23},
    {name: "Potato Chicken", calories: 190, protein: 8, carbs: 18, fat: 10},
]

export const chickenBreast: readonly FoodEntry[] = [
    {name: "Honey Sesame Chicken Breast", calories: 340, protein: 16, carbs: 35, fat: 15},
    {name: "String Bean Chicken Breast", calories: 210, protein: 12, carbs: 13, fat: 12},
    {name: "Sweetfire Chicken Breast", calories: 360, protein: 15, carbs: 40, fat: 15},
    {name: "Sweet & Sour Chicken Breast", calories: 300, protein: 10, carbs: 40, fat: 10},
]

export const beef: readonly FoodEntry[] = [
    {name: "Beijing Beef", calories: 480, protein: 14, carbs: 46, fat: 27},
    {name: "Black Pepper Angus Steak", calories: 210, protein: 19, carbs: 13, fat: 10},
    {name: "Broccoli Beef", calories: 150, protein: 9, carbs: 13, fat: 7},
]

export const seafood: readonly FoodEntry[] = [
    {name: "Honey Walnut Shrimp", calories: 360, protein: 11, carbs: 27, fat: 24},
    {name: "Wok-Fried Shrimp", calories: 190, protein: 17, carbs: 19, fat: 5},
    {name: "Golden Treasure Shrimp", calories: 360, protein: 14, carbs: 35, fat: 18},
    {name: "Steamed Ginger Fish", calories: 200, protein: 15, carbs: 8, fat: 12},
]

export const appetizers: readonly FoodEntry[] = [
    {name: "Chicken Egg Roll (1 Roll)", calories: 200, protein: 6, carbs: 20, fat: 10},
    {name: "Chicken Potstickers (3 Pcs)", calories: 160, protein: 6, carbs: 20, fat: 6},
    {name: "Cream Cheese Rangoon (3 Pcs)", calories: 190, protein: 5, carbs: 24, fat: 8},
    {name: "Vegetable Spring Roll (2 Rolls)", calories: 240, protein: 4, carbs: 24, fat: 14},
]