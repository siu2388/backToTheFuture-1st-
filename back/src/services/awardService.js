// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class AwardService {
  static async addAward({ userId, title, grade, date, description }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newAward = { id, userId, title, grade, date, description };
    
    // 공란일 경우, 에러 메시지 반환
    if (!newAward.title || !newAward.grade || !newAward.date || !newAward.description) {
      const errorMessage = 
        "Award 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage =
        "Award 조회: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }
  //userId로 수상목록들 조회
  static async getAwardList({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async setAward({ awardId, toUpdate }) {
    let award = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "Award 조회: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.grade) {
      const fieldToUpdate = "grade";
      const newValue = toUpdate.grade;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }
    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    return award;
  }

  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "Award 삭제: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { AwardService };
