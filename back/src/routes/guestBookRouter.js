import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { GuestBookService } from "../services/guestBookService";
/**
 * @desciption
 * 남의 방명록에 또 다른 사람이 글을 쓴다.
 */
const guestBookRouter = Router();
guestBookRouter.use(login_required);

guestBookRouter.post("/guestBooks/:receiverId", async (req, res, next) => {
  //여기서 작성자는 누구?  -> 토큰을 가진 유저 아무나
  const authorId = req.currentUserId;

  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const receiverId = req.params.receiverId;
    const { authorName, content } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newGuestBook = await GuestBookService.addGuestBook({
      authorId,
      receiverId,
      authorName,
      content,
    });

    if (newGuestBook.errorMessage) {
      throw new Error(newGuestBook.errorMessage);
    }

    res.status(201).json(newGuestBook);
    return;
  } catch (error) {
    next(error);
  }
});

// 작성된 방명록 목록 불러오기
guestBookRouter.get("/guestBooklist/:receiverId", async (req, res, next) => {
  try {
    // 특정 사용자의 전체 방명록 목록을 얻음
    const receiverId = req.params.receiverId;
    const guestBookList = await GuestBookService.getGuestBookList(receiverId);
    const sortedGuestBookList = guestBookList.sort().reverse()

    res.status(200).send(sortedGuestBookList);
    return;
  } catch (error) {
    next(error);
  }
});

//방명록의 주인이 글 삭제
guestBookRouter.delete(
  "/guestBooks/:receiverId/:guestBookId/remove/author",
  async (req, res, next) => {
    try {
      //여기서 작성자는 누구? => 방명록의 주인
      const authorId = req.currentUserId;

      const foundGuestBook = await GuestBookService.findOneGuestBookById(
        req.params.guestBookId
      );

      if (foundGuestBook.errorMessage) {
        throw new Error(foundGuestBook.errorMessage);
      }

      //이 게시물 작성자랑 토큰 유저랑 같은지?
      if (foundGuestBook.authorId !== authorId) {
        res.status(403).json("권한이 없습니다.");
        return;
      } else {
        // 맞으면 삭제
        const result = await GuestBookService.deleteGuestBookByGuestBookId({
          guestBookId: req.params.guestBookId,
        });

        if (result.errorMessage) {
          throw new Error(result.errorMessage);
        }

        res.status(200).json("삭제 완료");
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);
//글 작성자가 글 삭제
guestBookRouter.delete(
  "/guestBooks/:receiverId/:guestBookId/remove/receiver",
  async (req, res, next) => {
    try {
      //여기서 작성자는 누구?
      const receiverId = req.currentUserId;

      const foundGuestBook = await GuestBookService.findOneGuestBookById(
        req.params.guestBookId
      );

      if (foundGuestBook.errorMessage) {
        throw new Error(foundGuestBook.errorMessage);
      }

      /*이 게시물 receiverId랑 의 토큰의 userId랑 같은지? */
      if (foundGuestBook.receiverId !== receiverId) {
        return res.status(403).json("권한이 없습니다.");
      } else {
        // 맞으면 삭제
        const result = await GuestBookService.deleteGuestBookByGuestBookId({
          guestBookId: req.params.guestBookId,
        });

        if (result.errorMessage) {
          throw new Error(result.errorMessage);
        }

        res.status(200).json("삭제 완료");
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);

export default guestBookRouter;
