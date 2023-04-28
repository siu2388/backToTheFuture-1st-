import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
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
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const CertificateModel = model("Certificate", CertificateSchema);  //이제 CertificateModel.find()같은거 쓸수있음

export { CertificateModel };