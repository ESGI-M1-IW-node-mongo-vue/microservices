import { Hono } from 'hono';
import { Order } from '../models/order';
import mongoose from "mongoose";

const api = new Hono().basePath("/order");

api.post('/', async (c) => {
    try {
        const orderData = await c.req.json();

        const newOrder = new Order(orderData);
        await newOrder.save();

        return c.json(newOrder, 201);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 500);
    }
});

api.patch('/:orderId/dish/:dishName/status', async (c) => {
    try {
        const { orderId, dishName } = c.req.param();
        const { status } = await c.req.json<{ status: string }>();


        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return c.json({ error: 'Invalid Order ID' }, 400);
        }


        const order = await Order.findById(orderId);
        if (!order) {
            return c.json({ error: 'Order not found' }, 404);
        }


        const dish = order.dishes.find(d => d.name === dishName);
        if (!dish) {
            return c.json({ error: 'Dish not found' }, 404);
        }


        dish.status = status;
        await order.save();

        return c.json(order);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 500);
    }
});

api.get('/', async (c) => {
    try {
        const orders = await Order.find();
        return c.json(orders);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 500);
    }
});

api.get('/:orderId', async (c) => {
    try {
        const { orderId } = c.req.param();
        const order = await Order.findById(orderId);

        if (!order) {
            return c.json({ error: 'Order not found' }, 404);
        }

        return c.json(order);
    } catch (error) {
        return c.json({ error: (error as Error).message }, 500);
    }
});

export default api;