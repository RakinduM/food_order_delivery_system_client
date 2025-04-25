// types/menu.type.ts
export type MenuItemCategory =
  | "MEALS"
  | "BOWLS"
  | "DESSERTS"
  | "BEVERAGES"
  | "SIDES"
  | "OTHERS";
export type MenuItemPortion = "REGULAR" | "MEDIUM" | "LARGE";

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: MenuItemCategory;
  imageUrl: string;
  price: number;
  portion: MenuItemPortion;
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemRequest {
  restaurantId: string;
  name: string;
  description: string;
  category: MenuItemCategory;
  imageUrl: string;
  price: number;
  portion: MenuItemPortion;
  is_available: boolean;
}
