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
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.date = ret.date.toISOString().slice(0, 7);
      },
    },
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
