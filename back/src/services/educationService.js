// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class EducationService {
  static async addEducation({ userId, schoolName, schoolType, major, status,startDate, endDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newEducation = { id, userId, schoolName, schoolType, major, status, startDate, endDate };
    
    // 공란일 경우, 에러 메시지 반환
    if (!newCareer.company || !newCareer.department || !newCareer.position || !newCareer.description || !newCareer.startDate || !newCareer.endDate) {
      const errorMessage = 
        "Career 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((newEducation.endDate) && (!moment(newEducation.startDate).isBefore(moment(newEducation.endDate)))){
      const errorMessage =
        "Education 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
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
        "Education 조회: 해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
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
        "Education 조회: 해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((toUpdate.endDate) && (!moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate)))){
      const errorMessage =
        "Education 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트
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
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "Education 삭제: 해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { EducationService };
