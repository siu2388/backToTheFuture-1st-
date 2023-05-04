// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Skill } from "../db";
import { v4 as uuidv4 } from "uuid";

class SkillService {
  static async addSkill({ userId, skillName, level, period, startDate, endDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newSkill = { id, userId, skillName, level, period, startDate, endDate };
    
    if (!newSkill.startDate) {
      const errorMessage = "Skill startDate를 입력해주세요.";
      return { errorMessage };
    }
    if (!newSkill.endDate) {
      const errorMessage = "Skill endDate를 입력해주세요.";
      return { errorMessage };
    }
    if (newSkill.startDate.length !== 8) {
      const errorMessage = "Skill startDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newSkill.startDate)) {
    //   const errorMessage = "Skill startDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newSkill.endDate.length !== 8) {
      const errorMessage = "Skill endDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newSkill.endDate)) {
    //   const errorMessage = "Skill endDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newSkill.startDate > newSkill.endDate) {
      const errorMessage = "Skill startDate가 endDate보다 나중일 순 없습니다.";
      return { errorMessage };
    }
    if (newSkill.startDate[4] > 1) {
      const errorMessage = "Skill startDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.startDate[5] > 2) {
      const errorMessage = "Skill startDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.startDate[6] > 3) {
      const errorMessage = "Skill startDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.startDate[6] === '3' && newSkill.startDate[7] > 1 ) {
      const errorMessage = "Skill startDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.endDate[4] > 1) {
      const errorMessage = "Skill endDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.endDate[5] > 2) {
      const errorMessage = "Skill endDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.endDate[6] > 3) {
      const errorMessage = "Skill endDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newSkill.endDate[6] === '3' && newSkill.endDate[7] > 1 ) {
      const errorMessage = "Skill endDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }

    const createdNewSkill = await Skill.create({ newSkill });

    return createdNewSkill;
  }

  static async getSkill({ skillId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const skill = await Skill.findById({ skillId });
    if (!skill) {
      const errorMessage =
        "해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return skill;
  }
  //userId로 스킬목록들 조회
  static async getSkillList({ userId }) {
    const skills = await Skill.findByUserId({ userId });
    return skills;
  }

  static async setSkill({ skillId, toUpdate }) {
    let skill = await Skill.findById({ skillId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!skill) {
      const errorMessage =
        "해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.skillName) {
      const fieldToUpdate = "skillName";
      const newValue = toUpdate.skillName;
      skill = await Skill.update({ skillId, fieldToUpdate, newValue });
    }

    if (toUpdate.level) {
      const fieldToUpdate = "level";
      const newValue = toUpdate.level;
      skill = await Skill.update({ skillId, fieldToUpdate, newValue });
    }
    if (toUpdate.period) {
      const fieldToUpdate = "period";
      const newValue = toUpdate.period;
      skill = await Skill.update({ skillId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;

      if (newValue.length !== 8) {
        const errorMessage = "Skill startDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Skill startDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요.";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Skill startDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Skill startDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Skill startDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Skill startDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      skill = await Skill.update({ skillId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;

      if (newValue.length !== 8) {
        const errorMessage = "Skill endDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Skill endDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요!";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Skill endDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Skill endDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Skill endDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Skill endDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      skill = await Skill.update({ skillId, fieldToUpdate, newValue });
    }

    return skill;
  }

  static async deleteSkill({ skillId }) {
    const isDataDeleted = await Skill.deleteById({ skillId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { SkillService };
