import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: false,
      default: "",
    },
    blog: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
    },
    homeName: {
      type: String,
      default: "나의 미니홈피",
    },
    bgColor: {
      type: String,
      default: "#a3a3a3",
    },
    boxColor: {
      type: String,
      default: "#b4d1da",
    },
    menuColor: {
      type: String,
      default: "#3B87AB",
    },
    image: {
      path: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = model("User", UserSchema);

export { UserModel };
