import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  tel?: string;
  description?: string;
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    tel: { type: String, lowercase: true, trim: true },
    description: { type: String },
});

export const User = model<IUser>("users", userSchema);
