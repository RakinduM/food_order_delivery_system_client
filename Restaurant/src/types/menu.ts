export type PortionSize = "REGULAR" | "MEDIUM" | "LARGE";
export type Category =
  | "MEALS"
  | "BOWLS"
  | "DESSERTS"
  | "BEVERAGES"
  | "SIDES"
  | "OTHERS";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  portion: PortionSize;
  category: Category;
  isAvailable: boolean;
  createdAt: Date;
}
