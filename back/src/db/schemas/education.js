import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolType: {
      type: String,
      required: false,
    },
    major: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
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
        ret.startDate = ret.startDate.toISOString().slice(0, 10);
        ret.endDate = ret.endDate
          ? ret.endDate.toISOString().slice(0, 10)
          : null;
      },
    },
  }
);
const EducationModel = model("Education", EducationSchema);

export { EducationModel };
