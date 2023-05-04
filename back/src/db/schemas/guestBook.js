import { Schema, model } from "mongoose";

const GuestBookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const GuestBookModel = model("GuestBook", GuestBookSchema);

export { GuestBookModel };
