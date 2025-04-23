import { Category } from "../types/menu";

export const CATEGORIES: Category[] = [
  "MEALS",
  "BOWLS",
  "DESSERTS",
  "BEVERAGES",
  "SIDES",
  "OTHERS",
];

export const PORTION_SIZES = ["REGULAR", "MEDIUM", "LARGE"] as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  MEALS: "Meals",
  BOWLS: "Bowls",
  DESSERTS: "Desserts",
  BEVERAGES: "Beverages",
  SIDES: "Sides",
  OTHERS: "Others",
};

export const PORTION_LABELS: Record<"REGULAR" | "MEDIUM" | "LARGE", string> = {
  REGULAR: "Regular",
  MEDIUM: "Medium",
  LARGE: "Large",
};
