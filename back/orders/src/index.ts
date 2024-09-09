import { Elysia, t } from "elysia";
import "./db.setup";
import { Order } from "./models/orders";

const app = new Elysia()
  .group("/orders", (app) =>
    app
      // list all orders
      // filter by status for the kitchen
      // filter on the user's command if it's a user fetching
      .get(
        "/",
        ({ query, headers }) => {
          const role = headers["X-Role"]; // "user" || "admin" || "kitchen";
          const userId = headers["X-User"];

          return Order.find({
            status: query.status,
            ...(role === "user" && { client: userId }),
          });
        },
        {
          query: t.Object({
            status: t.String(),
          }),
          headers: t.Object({ "X-Role": t.String(), "X-User": t.String() }),
          error({ error }) {
            //todo: handle error
            return error;
          },
        },
      )
      // create a new order, store it and request the other services to process it
      .post("/", (req) => `Create order ${req.body.name}`)
      // get a specific order
      .get("/:id", (req) => `Order ${req.params.id}`)
      // update an order
      .put("/:id", (req) => `Update order ${req.params.id}`)
      // delete an order
      .delete("/:id", (req) => `Delete order ${req.params.id}`),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
