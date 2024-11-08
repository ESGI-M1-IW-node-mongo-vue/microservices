import {Elysia, t} from "elysia";
import "./db.setup";
import {Order} from "./models/orders";

const app = new Elysia()
    .get(
        "/",
        ({headers}) =>
            "Hello from Elysia! here are the headers: " + JSON.stringify(headers),
    )
    .group("/orders", (app) =>
        app
            // list all orders
            // filter by status for the kitchen
            // filter on the user's command if it's a user fetching
            .get(
                "/",
                ({query, headers}) => {
                    const role = headers["X-Role"];
                    const userId = headers["X-User"];

                    return Order.find({
                        status: query.status,
                        ...(role === "user" && {client: userId}),
                    });
                },
                {
                    query: t.Object({
                        status: t.String(),
                    }),
                    headers: t.Object({
                        "X-Role": t.Enum({
                            admin: "admin",
                            user: "user",
                            kitchen: "kitchen",
                        }),
                        "X-User": t.String(),
                    }),
                    error({error}) {
                        //todo: handle error
                        return error;
                    },
                },
            )
            // create a new order, store it and request the other services to process it
            .post("/", ({body}) => `Create order ${body.name}`, {
                body: t.Object({
                    name: t.String(),
                }),
            })
            // get a specific order
            .get("/:id", ({params}) => Order.findById(params.id), {
                params: t.Object({
                    id: t.String(),
                }),
            })
            // update an order
            .put(
                "/:id",
                ({params, body}) => Order.findByIdAndUpdate(params.id, body),
                {
                    params: t.Object({
                        id: t.String(),
                    }),
                    body: t.Object({
                        name: t.String(),
                    }),
                },
            )
            // delete an order
            .delete("/:id", ({params}) => Order.findByIdAndDelete(params.id), {
                params: t.Object({
                    id: t.String(),
                }),
            }),
    )
    .listen({port: 3000, hostname: '0.0.0.0'});

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
