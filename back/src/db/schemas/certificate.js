import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
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
    authority: {
      type: String,
      required: true,
    },
    registerNum: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
