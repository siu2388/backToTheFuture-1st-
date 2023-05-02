// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { GuestBook } from "../db";
import { v4 as uuidv4 } from "uuid";

class GuestBookService {
  static async addGuestBook({ authorId, receiverId, content, createdAt, updatedAt }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newGuestBook = { id, authorId, receiverId, content, createdAt, updatedAt };
    const createdNewGuestBook = await GuestBook.create({ newGuestBook });

    return createdNewGuestBook;
  }

  // 기획에서 특정 방명록을 조회할 필요는 없어보임
  // 리스트만 조회하면 충분하지 않나..?
  // 방명록 상세 페이지 X
  // 함수명만 봐도 뭐하는 애인지 알 수 있게
  // ㄱㄱㄱㄱㄱ
  static async getGuestBooksByReceiverId({ receiverId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const guestBooks = await GuestBook.findById({ receiverId });
    return guestBooks;
    // 만약 에러 처리 해버리면
    // 방명록 비어있는 [] 사람은 계속 에러
    // 리스트는 비어있으면 그냥 비어있는대로 응답 []
    // if (!guestBooks) {
    //   const errorMessage =
    //     "해당 id를 가진 방명 데이터는 없습니다. 다시 한 번 확인해 주세요.";
    //   return { errorMessage };
    // }
  }

  static async findOneGuestBookById(guestBookId) {
    const guestBook = await GuestBook.findById({guestBookId});
     if (!guestBook) {
      const errorMessage =
        "해당 id를 가진 방명록 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return guestBook;
  }

  // 드래그
  // ctrl + d
  // 라우터 - validation - receiver 맞는지 또는 author 맞는지
  // validation만 해주면 하나의 함수로 재활용 가능
  // service - 걍 삭제
  // 매개 변수 2개 받을 거면 함수 분리
  // 1개 받을거면 1개의 함수로 재활용
  static async deleteGuestBookByGuestBookId({ guestBookId }) {
    // mongoose deleteById 메서드는 내부적으로 _id를 찾아서 지움
    // 여기서 id: 이 빠져야 하네여
    // 매개변수 형태를 맞추는거에요
    // 고양이
    // 다 됐으면 npm run start
    // 포스트맨 테스트 ㄱㄱㄱㄱㄱ 왜 잘 되지
    const isDataDeleted = await GuestBook.deleteById({ guestBookId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 방명록이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    return { status: "ok" };
  }
}
export { GuestBookService };
