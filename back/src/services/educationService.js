// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
  static async addEducation({ userId, schoolName, schoolType, major, status,startDate, endDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newEducation = { id, userId, schoolName, schoolType, major, status, startDate, endDate };
    
    if (!newEducation.startDate) {
      const errorMessage = "Education startDate를 입력해주세요.";
      return { errorMessage };
    }
    if (!newEducation.endDate) {
      const errorMessage = "Education endDate를 입력해주세요.";
      return { errorMessage };
    }
    if (newEducation.startDate.length !== 8) {
      const errorMessage = "Education startDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newEducation.startDate)) {
    //   const errorMessage = "Education startDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newEducation.endDate.length !== 8) {
      const errorMessage = "Education endDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newEducation.endDate)) {
    //   const errorMessage = "Education endDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newEducation.startDate > newEducation.endDate) {
      const errorMessage = "Education startDate가 endDate보다 나중일 순 없습니다.";
      return { errorMessage };
    }
    if (newEducation.startDate[4] > 1) {
      const errorMessage = "Education startDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.startDate[5] > 2) {
      const errorMessage = "Education startDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.startDate[6] > 3) {
      const errorMessage = "Education startDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.startDate[6] === '3' && newEducation.startDate[7] > 1 ) {
      const errorMessage = "Education startDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.endDate[4] > 1) {
      const errorMessage = "Education endDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.endDate[5] > 2) {
      const errorMessage = "Education endDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.endDate[6] > 3) {
      const errorMessage = "Education endDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newEducation.endDate[6] === '3' && newEducation.endDate[7] > 1 ) {
      const errorMessage = "Education endDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }

    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static async getEducationList({ userId }) {
    const educations = await Education.findByUserId({ userId });
    return educations;
  }

  static async setEducation({ educationId, toUpdate }) {
    let education = await Education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.schoolName) {
      const fieldToUpdate = "schoolName";
      const newValue = toUpdate.schoolName;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.schoolType) {
      const fieldToUpdate = "schoolType";
      const newValue = toUpdate.schoolType;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }
    
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }
    
    if (toUpdate.status) {
      const fieldToUpdate = "status";
      const newValue = toUpdate.status;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;

      if (newValue.length !== 8) {
        const errorMessage = "Education startDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Education startDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요.";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Education startDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Education startDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Education startDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Education startDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;

      if (newValue.length !== 8) {
        const errorMessage = "Education endDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Education endDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요!";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Education endDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Education endDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Education endDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Education endDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { EducationService };
