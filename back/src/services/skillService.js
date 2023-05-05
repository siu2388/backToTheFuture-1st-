import { Skill } from "../db";
import { v4 as uuidv4 } from "uuid";

class SkillService {
  static async addSkill({ userId, skillName, level, period }) {
    const id = uuidv4();

    const newSkill = { id, userId, skillName, level, period };

    if (!newSkill.skillName || !newSkill.level || !newSkill.period) {
      const errorMessage =
        "Skill 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewSkill = await Skill.create({ newSkill });

    return createdNewSkill;
  }

  static async getSkill({ skillId }) {
    const skill = await Skill.findById({ skillId });
    if (!skill) {
      const errorMessage =
        "Skill 조회: 해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return skill;
  }

  static async getSkillList({ userId }) {
    const skills = await Skill.findByUserId({ userId });
    return skills;
  }

  static async setSkill({ skillId, toUpdate }) {
    let skill = await Skill.findById({ skillId });

    if (!skill) {
      const errorMessage =
        "Skill 조회: 해당 id를 가진 경력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
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

    return skill;
  }

  static async deleteSkill({ skillId }) {
    const isDataDeleted = await Skill.deleteById({ skillId });

    if (!isDataDeleted) {
      const errorMessage =
        "Skill 삭제: 해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { SkillService };
