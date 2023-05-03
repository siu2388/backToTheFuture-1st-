import { Schema, model } from "mongoose";

const GuestBookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },  
  },
  {
    timestamps: true,
  }
);
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const GuestBookModel = model("GuestBook", GuestBookSchema); //이제 GuestBookModel.find()같은거 쓸수있음

export { GuestBookModel };
