import { GuestBook } from "../db";
import { v4 as uuidv4 } from "uuid";

class GuestBookService {
  static async addGuestBook({ authorId, receiverId, authorName, content, createdAt, updatedAt }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newGuestBook = { id, authorId, receiverId, authorName, content, createdAt, updatedAt };
    const createdNewGuestBook = await GuestBook.create({ newGuestBook });

    return createdNewGuestBook;
  }

  //방명록에서 개인홈 주인을 찾는 함수
  static async getGuestBooksByReceiverId({ receiverId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "GuestBook 삭제: 해당 id를 가진 방명록이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}
export { GuestBookService };
