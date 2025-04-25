// constants/categories.ts
type MenuItemCategory =
  | "MEALS"
  | "BOWLS"
  | "DESSERTS"
  | "BEVERAGES"
  | "SIDES"
  | "OTHERS";

export const CATEGORY_LABELS: Record<MenuItemCategory, string> = {
  MEALS: "Meals",
  BOWLS: "Bowls",
  DESSERTS: "Desserts",
  BEVERAGES: "Beverages",
  SIDES: "Sides",
  OTHERS: "Others",
};

type MenuItemPortion = "REGULAR" | "MEDIUM" | "LARGE";

export const PORTION_LABELS: Record<MenuItemPortion, string> = {
  REGULAR: "Regular",
  MEDIUM: "Medium",
  LARGE: "Large",
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as MenuItemCategory[];
export const PORTION_SIZES = Object.keys(PORTION_LABELS) as MenuItemPortion[];
