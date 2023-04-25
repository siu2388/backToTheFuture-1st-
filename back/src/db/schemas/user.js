import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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
  }
);
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const UserModel = model("User", UserSchema);  //이제 UserModel.find()같은거 쓸수있음

export { UserModel };
