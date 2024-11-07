import { model, Schema } from "mongoose";

export interface IOrder {
    status: String;
}

export const modelSchema = new Schema<IOrder>({
    status: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
});

export const Order = model<IOrder>("Order", modelSchema);
