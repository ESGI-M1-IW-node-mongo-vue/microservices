import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DbConnect } from "./db";
import auth from "./routes/auth";
import { cors } from "hono/cors";

const app = new Hono();
await DbConnect();

const port = 3001;
console.log(`Server is running on port ${port}`);

app.use("/api/*", cors());

app.route("/api", auth);

app.all("*", (c) => {
  return c.json({ msg: "404 oups" });
});

serve({
  fetch: app.fetch,
  port,
});
