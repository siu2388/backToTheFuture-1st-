// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Career } from "../db";
import { v4 as uuidv4 } from "uuid";

class CareerService {
  static async addCareer({
    user_id,
    company,
    department,
    position,
    description,
    startDate,
    endDate,
  }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newCareer = {
      id,
      user_id,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    };
    const createdNewCareer = await Career.create({ newCareer });

    return createdNewCareer;
  }

  static async getCareer({ careerId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const career = await Career.findById({ careerId });
    if (!career) {
      const errorMessage =
        "해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return career;
  }
  //user_id로 경력목록들 조회
  static async getCareerList({ user_id }) {
    const careers = await Career.findByUserId({ user_id });
    return careers;
  }

  static async setCareer({ careerId, toUpdate }) {
    let career = await Career.findById({ careerId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!career) {
      const errorMessage =
        "해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.company) {
      const fieldToUpdate = "company";
      const newValue = toUpdate.company;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    if (toUpdate.department) {
      const fieldToUpdate = "department";
      const newValue = toUpdate.department;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    return career;
  }

  static async deleteCareer({ careerId }) {
    const isDataDeleted = await Career.deleteById({ careerId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { CareerService };
