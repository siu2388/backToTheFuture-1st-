import { GuestBook } from "../db";
import { v4 as uuidv4 } from "uuid";

class GuestBookService {
  static async addGuestBook({ authorId, receiverId, authorName, content }) {
    const id = uuidv4();

    const newGuestBook = { id, authorId, receiverId, authorName, content };

    if (!newGuestBook.authorId || !newGuestBook.receiverId || !newGuestBook.authorName || !newGuestBook.content) {
      const errorMessage =
        "GuestBook 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewGuestBook = await GuestBook.create({ newGuestBook });

    return createdNewGuestBook;
  }

  static async getGuestBooksByReceiverId({ receiverId }) {
    const guestBook = await GuestBook.findById({ receiverId });
    return guestBook;
  }

  static async getGuestBookList({ receiverId }) {
    const guestBooks = await GuestBook.findByReceiverId({ receiverId });
    return guestBooks;
  }

  static async findOneGuestBookById(guestBookId) {
    const guestBook = await GuestBook.findById({ guestBookId });
    if (!guestBook) {
      const errorMessage =
        "GuestBook 조회: 해당 id를 가진 방명록 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return guestBook;
  }

  static async deleteGuestBookByGuestBookId({ guestBookId }) {
    const isDataDeleted = await GuestBook.deleteById({ guestBookId });

    if (!isDataDeleted) {
      const errorMessage =
        "GuestBook 삭제: 해당 id를 가진 방명록이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}
export { GuestBookService };
