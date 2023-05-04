// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Career } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class CareerService {
  static async addCareer({
    userId,
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
    const newCareer = { id, userId, company, department, position, description, startDate, endDate };

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((newCareer.endDate) && (!moment(newCareer.startDate).isBefore(moment(newCareer.endDate)))){
      const errorMessage =
        "Career 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewCareer = await Career.create({ newCareer });

    return createdNewCareer;
  }

  static async getCareer({ careerId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const career = await Career.findById({ careerId });
    if (!career) {
      const errorMessage =
        "Career 조회: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return career;
  }
  //userI로 경력목록들 조회
  static async getCareerList({ userId }) {
    const careers = await Career.findByUserId({ userId });
    return careers;
  }

  static async setCareer({ careerId, toUpdate }) {
    let career = await Career.findById({ careerId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!career) {
      const errorMessage =
        "Career 조회: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((toUpdate.endDate) && (!moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate)))){
      const errorMessage =
        "Career 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트
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

    const fieldToUpdate = "endDate";
    const newValue = toUpdate.endDate || null;  // endDate가 null일 경우, '재직중'으로 출력되게?
    career = await Career.update({ careerId, fieldToUpdate, newValue });

    console.log("커리어 수정: ", career);
    return career;
  }

  static async deleteCareer({ careerId }) {
    const isDataDeleted = await Career.deleteById({ careerId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "Career 삭제: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { CareerService };
