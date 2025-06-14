
export type NutrientType = "vitamin" | "mineral";

export interface FDANutrient {
  key: string;
  name: string;
  type: NutrientType;
  dailyValue: number;
  unit: string;
  tooltip?: string;
}

// Source: FDA adult DVs (rounded, see https://www.fda.gov/media/99069/download)
export const FDA_NUTRIENTS: FDANutrient[] = [
  // Vitamins (examples)
  { key: "Vitamin A", name: "Vitamin A", type: "vitamin", dailyValue: 900, unit: "mcg", tooltip: "900 mcg RAE" },
  { key: "Vitamin C", name: "Vitamin C", type: "vitamin", dailyValue: 90, unit: "mg", tooltip: "90 mg" },
  { key: "Vitamin D", name: "Vitamin D", type: "vitamin", dailyValue: 20, unit: "mcg", tooltip: "20 mcg (800 IU)" },
  { key: "Vitamin E", name: "Vitamin E", type: "vitamin", dailyValue: 15, unit: "mg", tooltip: "15 mg" },
  { key: "Vitamin K", name: "Vitamin K", type: "vitamin", dailyValue: 120, unit: "mcg", tooltip: "120 mcg" },
  { key: "Thiamin", name: "Thiamin (B1)", type: "vitamin", dailyValue: 1.2, unit: "mg" },
  { key: "Riboflavin", name: "Riboflavin (B2)", type: "vitamin", dailyValue: 1.3, unit: "mg" },
  { key: "Niacin", name: "Niacin (B3)", type: "vitamin", dailyValue: 16, unit: "mg" },
  { key: "Vitamin B6", name: "Vitamin B6", type: "vitamin", dailyValue: 1.7, unit: "mg" },
  { key: "Folate", name: "Folate", type: "vitamin", dailyValue: 400, unit: "mcg" },
  { key: "Vitamin B12", name: "Vitamin B12", type: "vitamin", dailyValue: 2.4, unit: "mcg" },
  { key: "Biotin", name: "Biotin", type: "vitamin", dailyValue: 30, unit: "mcg" },
  { key: "Pantothenic Acid", name: "Pantothenic Acid", type: "vitamin", dailyValue: 5, unit: "mg" },

  // Minerals (examples)
  { key: "Calcium", name: "Calcium", type: "mineral", dailyValue: 1300, unit: "mg" },
  { key: "Iron", name: "Iron", type: "mineral", dailyValue: 18, unit: "mg" },
  { key: "Phosphorus", name: "Phosphorus", type: "mineral", dailyValue: 1250, unit: "mg" },
  { key: "Iodine", name: "Iodine", type: "mineral", dailyValue: 150, unit: "mcg" },
  { key: "Magnesium", name: "Magnesium", type: "mineral", dailyValue: 420, unit: "mg" },
  { key: "Zinc", name: "Zinc", type: "mineral", dailyValue: 11, unit: "mg" },
  { key: "Selenium", name: "Selenium", type: "mineral", dailyValue: 55, unit: "mcg" },
  { key: "Copper", name: "Copper", type: "mineral", dailyValue: 0.9, unit: "mg" },
  { key: "Manganese", name: "Manganese", type: "mineral", dailyValue: 2.3, unit: "mg" },
  { key: "Chromium", name: "Chromium", type: "mineral", dailyValue: 35, unit: "mcg" },
  { key: "Molybdenum", name: "Molybdenum", type: "mineral", dailyValue: 45, unit: "mcg" },
  { key: "Chloride", name: "Chloride", type: "mineral", dailyValue: 2300, unit: "mg" },
  { key: "Potassium", name: "Potassium", type: "mineral", dailyValue: 4700, unit: "mg" },
  { key: "Sodium", name: "Sodium", type: "mineral", dailyValue: 2300, unit: "mg" },
];
