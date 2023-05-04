import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    archive: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.startDate = ret.startDate.toISOString().slice(0, 10);
        ret.endDate = ret.endDate ? ret.endDate.toISOString().slice(0, 10) : null;
      },
    },
  }
);
const ProjectModel = model("Project", ProjectSchema); 

export { ProjectModel };
