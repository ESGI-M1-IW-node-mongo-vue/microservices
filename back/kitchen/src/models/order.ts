import mongoose, { Schema, Document } from 'mongoose';


interface Dish {
    name: string;
    status: string;
}

interface OrderDocument extends Document {
    customerName: string;
    dishes: Dish[];
    createdAt: Date;
}

const orderSchema = new Schema<OrderDocument>({
    customerName: { type: String, required: true },
    dishes: [
        {
            name: { type: String, required: true },
            status: { type: String, default: 'pending' },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export { Order, OrderDocument };