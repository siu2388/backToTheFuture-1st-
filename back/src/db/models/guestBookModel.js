import { GuestBookModel } from "../schemas/guestBook";

class GuestBook {
  static async create({ newGuestBook }) {
    const createdNewGuestBook = await GuestBookModel.create(newGuestBook);
    return createdNewGuestBook;
  }

  static async findById({ guestBookId }) {
    const guestBook = await GuestBookModel.findOne({ id: guestBookId });
    return guestBook;
  }

  static async deleteById({ guestBookId }) {
    const deleteResult = await GuestBookModel.deleteOne({ id: guestBookId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}
export { GuestBook };
