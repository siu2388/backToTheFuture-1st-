import { Career } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class CareerService {
  static async addCareer({ userId, company, department, position, description, startDate, endDate }) {
    const id = uuidv4();

    const newCareer = { id, userId, company, department, position, description, startDate, endDate };

    if (!newCareer.company || !newCareer.department || !newCareer.position || !newCareer.description || !newCareer.startDate || !newCareer.endDate) {
      const errorMessage =
        "Career 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(newCareer.startDate).isBefore(moment(today))) {
      const errorMessage =
        "Career 추가: startDate를 오늘보다 미래 날짜로 입력할 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (newCareer.endDate && !moment(newCareer.startDate).isBefore(moment(newCareer.endDate))) {
      const errorMessage =
        "Career 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const createdNewCareer = await Career.create({ newCareer });

    return createdNewCareer;
  }

  static async getCareer({ careerId }) {
    const career = await Career.findById({ careerId });

    if (!career) {
      const errorMessage =
        "Career 조회: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return career;
  }

  static async getCareerList({ userId }) {
    const careers = await Career.findByUserId({ userId });
    return careers;
  }

  static async setCareer({ careerId, toUpdate }) {
    let career = await Career.findById({ careerId });

    if (!career) {
      const errorMessage =
        "Career 조회: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(toUpdate.startDate).isBefore(moment(today))) {
      const errorMessage =
        "Career 수정: startDate를 오늘보다 미래 날짜로 입력할 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (
      toUpdate.endDate &&
      !moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate))
    ) {
      const errorMessage =
        "Career 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
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

    if (!isDataDeleted) {
      const errorMessage =
        "Career 삭제: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { CareerService };
