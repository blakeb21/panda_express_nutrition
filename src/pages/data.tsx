export type FoodEntry = {
    name: string, 
    calories: number, 
    protein: number, 
    carbs: number, 
    fat: number
}

export const sides: FoodEntry[] = [
    {name: "Chow Mein", calories: 510, protein: 13, carbs: 80, fat: 20},
    {name: "Fried Rice", calories: 520, protein: 11, carbs: 85, fat: 16},
    {name: "Brown Steamed Rice", calories: 420, protein: 9, carbs: 86, fat: 4},
    {name: "White Steamed Rice", calories: 380, protein: 7, carbs: 87, fat: 0},
    {name: "Super Greens", calories: 90, protein: 6, carbs: 10, fat: 3},
    {name: "Chow Fun", calories: 410, protein: 9, carbs: 73, fat: 9},
]

export const chicken: FoodEntry[] = [
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

export const chickenBreast: FoodEntry[] = [
    {name: "Honey Sesame Chicken Breast", calories: 340, protein: 16, carbs: 35, fat: 15},
    {name: "String Bean Chicken Breast", calories: 210, protein: 12, carbs: 13, fat: 12},
    {name: "Sweetfire Chicken Breast", calories: 360, protein: 15, carbs: 40, fat: 15},
    {name: "Sweet & Sour Chicken Breast", calories: 300, protein: 10, carbs: 40, fat: 10},
]

export const beef: FoodEntry[] = [
    {name: "Beijing Beef", calories: 480, protein: 14, carbs: 46, fat: 27},
    {name: "Black Pepper Angus Steak", calories: 210, protein: 19, carbs: 13, fat: 10},
    {name: "Broccoli Beef", calories: 150, protein: 9, carbs: 13, fat: 7},
]

export const seafood: FoodEntry[] = [
    {name: "Honey Walnut Shrimp", calories: 360, protein: 11, carbs: 27, fat: 24},
    {name: "Wok-Fried Shrimp", calories: 190, protein: 17, carbs: 19, fat: 5},
    {name: "Golden Treasure Shrimp", calories: 360, protein: 14, carbs: 35, fat: 18},
    {name: "Steamed Ginger Fish", calories: 200, protein: 15, carbs: 8, fat: 12},
]

export const appetizers: FoodEntry[] = [
    {name: "Chicken Egg Roll (1 Roll)", calories: 200, protein: 6, carbs: 20, fat: 10},
    {name: "Chicken Potstickers (3 Pcs)", calories: 160, protein: 6, carbs: 20, fat: 6},
    {name: "Cream Cheese Rangoon (3 Pcs)", calories: 190, protein: 5, carbs: 24, fat: 8},
    {name: "Begetable Spring Roll (2 Rolls)", calories: 240, protein: 4, carbs: 24, fat: 14},
]