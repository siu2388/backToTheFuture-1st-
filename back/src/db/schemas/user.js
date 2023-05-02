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
    github: {
      type: String,
      required: false,
    },
    blog: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    image: {
      type : String,
    },
    homeName: {
      type: String,
      default: "나의 미니홈피"
    },
    bgColor: {
      type: String,
      default: "#a3a3a3"
    },
    boxColor: {
      type: String,
      default: "#b4d1da"
    },
    menuColor: {
      type: String,
      default: "#3B87AB"
    }
  },
  {
    timestamps: true,
  }
);
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const UserModel = model("User", UserSchema);  //이제 UserModel.find()같은거 쓸수있음

export { UserModel };
