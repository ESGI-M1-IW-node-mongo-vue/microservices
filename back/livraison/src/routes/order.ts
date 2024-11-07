import { Hono } from "hono";
import { isValidObjectId } from "mongoose";
import {Order} from "../models/order";

const api = new Hono().basePath("/order");

api.get("/", async (c) => {
    return c.json(await Order.find().sort({ name: 1 }));
});

api.get("/:id", async (c) => {
    const _id = c.req.param("id");

    if (isValidObjectId(_id)) {
        const oneModel = await Order.findOne({ _id });
        return c.json(oneModel);
    }
    return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
    const body = await c.req.parseBody();
    try {
        const newModel = new Order(body);
        const saveModel = await newModel.save();
        return c.json(saveModel, 201);
    } catch (error: any) {
        return c.json(error._message, 400);
    }
});

api.put("/:id", async (c) => {
    console.log('lalalal')
    const _id = c.req.param("id");
    const body = await c.req.json();
    const tryToUpdate = await Order.findOneAndUpdate(
        {
            _id,
        },
        body,
        {
            new: true,
        },
    );
    return c.json(tryToUpdate, 200);
});

api.delete("/:id", async (c) => {
    const _id = c.req.param("id");
    const tryToDelete = await Order.deleteOne({ _id });
    const { deletedCount } = tryToDelete;
    if (deletedCount) {
        return c.json({ msg: "DELETE done" });
    }
    return c.json({ msg: "not found" }, 404);
});

export default api;