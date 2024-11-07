import {serve} from '@hono/node-server';
import {Hono} from 'hono';
import {DbConnect} from './db';
import {cors} from 'hono/cors';
import order from "./routes/order";
import dishes from "./routes/dishes";

const startServer = async () => {
    const app = new Hono();

    await DbConnect();

    const port = 3000;
    console.log(`Server is running on port ${port}`);

    app.use("/api/*", cors({
        origin: "*",
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
    }));
    app.route("/api", order);
    app.route("/api", dishes);

    app.all("*", (c) => {
        return c.json({msg: "404 oups not found"}, 404);
    });

    serve({
        hostname: '0.0.0.0',
        fetch: app.fetch,
        port,
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error);
});