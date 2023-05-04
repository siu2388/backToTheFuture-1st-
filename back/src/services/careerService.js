// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Career } from "../db";
import { v4 as uuidv4 } from "uuid";

class CareerService {
  static async addCareer({ userId, company, department, position, description, startDate, endDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newCareer = { id, userId, company, department, position, description, startDate, endDate };
    
    if (!newCareer.startDate) {
      const errorMessage = "Career startDate를 입력해주세요.";
      return { errorMessage };
    }
    if (!newCareer.endDate) {
      const errorMessage = "Career endDate를 입력해주세요.";
      return { errorMessage };
    }
    if (newCareer.startDate.length !== 8) {
      const errorMessage = "Career startDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newCareer.startDate)) {
    //   const errorMessage = "Career startDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newCareer.endDate.length !== 8) {
      const errorMessage = "Career endDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newCareer.endDate)) {
    //   const errorMessage = "Career endDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newCareer.startDate > newCareer.endDate) {
      const errorMessage = "Career startDate가 endDate보다 나중일 순 없습니다.";
      return { errorMessage };
    }
    if (newCareer.startDate[4] > 1) {
      const errorMessage = "Career startDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.startDate[5] > 2) {
      const errorMessage = "Career startDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.startDate[6] > 3) {
      const errorMessage = "Career startDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.startDate[6] === '3' && newCareer.startDate[7] > 1 ) {
      const errorMessage = "Career startDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.endDate[4] > 1) {
      const errorMessage = "Career endDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.endDate[5] > 2) {
      const errorMessage = "Career endDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.endDate[6] > 3) {
      const errorMessage = "Career endDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newCareer.endDate[6] === '3' && newCareer.endDate[7] > 1 ) {
      const errorMessage = "Career endDate의 day 둘째 자리를 잘못 입력했습니다.";
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
        "해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
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

      if (newValue.length !== 8) {
        const errorMessage = "Career startDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      if (newValue[4] > 1) {
        const errorMessage = "Career startDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Career startDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Career startDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Career startDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      career = await Career.update({ careerId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;

      if (newValue.length !== 8) {
        const errorMessage = "Career endDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      if (newValue[4] > 1) {
        const errorMessage = "Career endDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Career endDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Career endDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Career endDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

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
