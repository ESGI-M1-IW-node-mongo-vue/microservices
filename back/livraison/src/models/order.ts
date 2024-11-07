import { model, Schema } from "mongoose";

export enum StatusEnum {
    Ready = "ready",
    InDelivery = "isInDelivery",
    Delivered = "delivered",
}

export interface IOrder {
    id: number;
    status: StatusEnum;
}

export const modelSchema = new Schema<IOrder>({
    id: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(StatusEnum),
        lowercase: true,
        trim: true
    }
});

export const Order = model<IOrder>("Order", modelSchema);
