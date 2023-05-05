import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required:false,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.date = ret.date.toISOString().slice(0, 10);
      },
    },
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
