import { Hono } from "hono";
import {decode, sign, verify} from 'hono/jwt'
import { User } from "../models/users";
import {guard} from "../../middlewares/auth";

const api = new Hono().basePath("/auth");

api.get("/", (c) => {
    return c.json("Hello World");
});

//get user by id
api.get("/me",guard,async (c) => {
  try {
    //Récupération du token dans le header de la requête
    const token = c.req.header("Authorization");

    if (!token) {
      return c.json("Token is missing", 401);
    }

    //Decode the token
    const tokenDecode = decode(token.replace("Bearer ", ""));

    const userId = tokenDecode.payload.sub;

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return c.json("User not found", 404);
    }

    return c.json(user);
  } catch (error: any) {
    console.error(error);
    return c.json(error._message, 400);
  }
});

api.post("/login", async (c) => {
  try {
    const body = await c.req.json();

    //Vérification de l'email et du mot de passe
    const user = await User.findOne({ email: body.email }).where({password: body.password});

    if (!user) {
      return c.json("Invalid email or password", 401);
    }

    const payload = {
      sub: user._id,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const secret = "pouetpouetpouet";
    const token = await sign(payload, secret);

    return c.json({ token });
  } catch (error: any) {
    console.error(error);
    return c.json(error._message, 400);
  }
});

api.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    //Check if the email is already used
    const isUserExist = await User.findOne({ email: body.email });

    if (isUserExist) {
      return c.json("Email already used", 400);
    }

    //Create a new user
    const user = new User(body);
    await user.save();

    return c.json(user);
  } catch (error: any) {
    console.error(error);
    return c.json(error._message, 400);
  }
});

export default api;
