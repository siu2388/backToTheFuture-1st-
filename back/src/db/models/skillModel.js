import { SkillModel } from "../schemas/skill";

class Skill {
  static async create({ newSkill }) {
    const createdNewSkill = await SkillModel.create(newSkill);
    return createdNewSkill;
  }

  static async findById({ skillId }) {
    const skill = await SkillModel.findOne({ id: skillId });
    return skill;
  }

  static async findByUserId({ user_id }) {
    const skills = await SkillModel.find({ user_id });
    return skills;
  }

  static async update({ skillId, fieldToUpdate, newValue }) {
    const filter = { id: skillId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedSkill = await SkillModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedSkill;
  }

  static async deleteById({ skillId }) {
    const deleteResult = await SkillModel.deleteOne({ id: skillId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Skill };
