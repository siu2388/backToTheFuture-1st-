import { Schema, model } from "mongoose";

const CareerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "직무 설명이 아직 없습니다. 추가해 주세요.",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.startDate = ret.startDate.toISOString().slice(0, 7);
        ret.endDate = ret.endDate.toISOString().slice(0, 7);
      },
    },
  }
);

const CareerModel = model("Career", CareerSchema);

export { CareerModel };
