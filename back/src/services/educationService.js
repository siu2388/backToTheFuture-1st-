import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class EducationService {
  static async addEducation({
    userId,
    schoolName,
    schoolType,
    major,
    status,
    startDate,
    endDate,
  }) {
    const id = uuidv4();

    const newEducation = {
      id,
      userId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    };

    if (
      !newEducation.schoolName ||
      !newEducation.status ||
      !newEducation.startDate ||
      !newEducation.endDate
    ) {
      const errorMessage =
        "Education 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(newEducation.startDate).isBefore(moment(today))) {
      const errorMessage =
        "Education 추가: startDate를 오늘보다 미래 날짜로 입력할 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (
      newEducation.endDate &&
      !moment(newEducation.startDate).isBefore(moment(newEducation.endDate))
    ) {
      const errorMessage =
        "Education 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewEducation = await Education.create({ newEducation });
    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
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

    if (!education) {
      const errorMessage =
        "Education 조회: 해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(toUpdate.startDate).isBefore(moment(today))) {
      const errorMessage =
        "Education 수정: startDate를 오늘보다 미래 날짜로 입력할 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (
      toUpdate.endDate &&
      !moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate))
    ) {
      const errorMessage =
        "Education 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.schoolName) {
      const fieldToUpdate = "schoolName";
      const newValue = toUpdate.schoolName;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.schoolType) {
      const fieldToUpdate = "schoolType";
      const newValue = toUpdate.schoolType;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.status) {
      const fieldToUpdate = "status";
      const newValue = toUpdate.status;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    if (!isDataDeleted) {
      const errorMessage =
        "Education 삭제: 해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok" };
  }
}

export { EducationService };
