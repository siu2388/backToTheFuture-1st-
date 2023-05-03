import { Schema, model } from "mongoose";

const SkillSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    skillName: {
      type: String,
      required: true,
    },
    level: {
      type: String,
    },
    period: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SkillModel = model("Skill", SkillSchema);

export { SkillModel };
