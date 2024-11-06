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
  //@ts-expect-error hazoul this will be valid
  dishes: { type: Schema.Types.ObjectId, ref: "dishes", required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  client: { type: String, required: true },
});

export const Order = model<IOrder>("orders", orderSchema);
