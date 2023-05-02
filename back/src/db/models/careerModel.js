import { CareerModel } from "../schemas/career";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async findById({ careerId }) {
    const career = await CareerModel.findOne({ id: careerId });
    return career;
  }

  static async findByUserId({ userId }) {
    const careers = await CareerModel.find({ userId });
    return careers;
  }

  static async update({ careerId, fieldToUpdate, newValue }) {
    const filter = { id: careerId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCareer = await CareerModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCareer;
  }

  static async deleteById({ careerId }) {
    const deleteResult = await CareerModel.deleteOne({ id: careerId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Career };
