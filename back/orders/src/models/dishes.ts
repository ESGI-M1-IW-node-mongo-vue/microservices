import { model, Schema } from "mongoose";

export interface IDish {
  name: string;
  price: number;
  ingredients?: string[];
  status: string;
}

export const dishesSchema = new Schema<IDish>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  ingredients: { type: [String] },
  status: { type: String, required: true },
});

export const Dish = model<IDish>("dishes", dishesSchema);
