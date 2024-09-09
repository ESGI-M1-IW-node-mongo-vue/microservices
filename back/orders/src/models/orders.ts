import { model, Schema } from "mongoose";
import { IDish } from "./dishes";

export interface IOrder {
  client: string;
  dishes: IDish[];
  total: number;
  address: string;
  status: string;
}

export const orderSchema = new Schema<IOrder>({
  dishes: { type: Schema.Types.ObjectId, ref: "dishes", required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export const Order = model<IOrder>("orders", orderSchema);
