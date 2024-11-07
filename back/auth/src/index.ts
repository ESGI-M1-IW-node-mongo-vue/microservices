import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DbConnect } from "./db";
import auth from "./routes/auth";
import { cors } from "hono/cors";

const app = new Hono();
await DbConnect();

const port = 3000;
console.log(`Server is running on port ${port}`);

app.use("/api/*", cors());

app.route("/api", auth);

app.all("*", (c) => {
  console.log('👋', c.req.url);
  return c.json({ msg: c.req.url });
});

serve({
  hostname: '0.0.0.0',
  fetch: app.fetch,
  port,
});
