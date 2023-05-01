import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolType: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
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
        ret.startDate = ret.startDate.toISOString().slice(0, 7);
        ret.endDate = ret.endDate.toISOString().slice(0, 7);
      },
    },
  }
);
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const EducationModel = model("Education", EducationSchema);  //이제 EducationModel.find()같은거 쓸수있음

export { EducationModel };