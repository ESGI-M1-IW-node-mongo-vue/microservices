import { model, Schema } from "mongoose";

export interface IDish {
    name: string;
    description?: string;
    ingredients?: string[];
}

export const dishesSchema = new Schema<IDish>({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    ingredients: { type: [String] },
});

export const Dish = model<IDish>("dishes", dishesSchema);
