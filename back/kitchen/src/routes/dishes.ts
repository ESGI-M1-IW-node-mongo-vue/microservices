import {Hono} from "hono";
import {Dish} from "../models/dishes";
import {isValidObjectId} from "mongoose";

const api = new Hono().basePath("/dishes");


api.get("/", async (c) => {
    try {
        return c.json(await Dish.find());
    } catch (error: any) {
        console.error(error);
        return c.json(error._message, 400);
    }
});

api.get("/:id", async (c) => {
    const _id = c.req.param("id");

    if (isValidObjectId(_id))
        return c.json(await Dish.findOne({_id}));

    return c.json({msg: "ObjectId malformed"}, 400);
});

api.post("/", async (c) => {
    try {
        const body = await c.req.json();

        const dish = new Dish(body);

        await dish.save();

        return c.json(dish);
    } catch (error: any) {
        console.error(error);
        return c.json(error._message, 400);
    }
});

api.put("/:id", async (c) => {
    const _id = c.req.param("id");
    const body = await c.req.json();
    const q = {
        _id,
    };
    const updateQuery = {
        ...body,
    };

    try {
        await Dish.findOneAndUpdate(q, updateQuery, {
            new: true,
        });
    } catch (error: any) {
        console.error(error);
        return c.json(error._message, 400);
    }
});

export default api;
