import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { GuestBookService } from "../services/guestBookService";
/**
 * @desciption
 * 남의 방명록에 다른 사람이 글을 쓴다.
 */
const guestBookRouter = Router();
guestBookRouter
  .route("/guestBooks:receiverId/")
  .post(login_required, async (req, res, next) => {
    //여기서 작성자는 누구?  -> 토큰을 가진 유저 아무나
    const authorId = req.currentUserId;

    // 코드 블록 꼬얐어여

    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const receiverId = req.params.receiverId;
      const content = req.body.content;

      // 위 데이터를 유저 db에 추가하기
      const newGuestBook = await GuestBookService.addGuestBook({
        authorId,
        receiverId,
        content,
      });

      res.status(201).json(newGuestBook);
    } catch (error) {
      next(error);
    }
  });
//박제록

guestBookRouter
  .route("/guestBooks/:receiverId/:guestBookId/remove/author")
  .delete(login_required, async (req, res) => {
    //여기서 작성자는 누구?
    const authorId = req.currentUserId;

    const foundGuestBook = await GuestBookService.findOneGuestBookById(
      req.params.guestBookId
    );

    if (foundGuestBook.errorMessage) throw "해당 방명록을 찾을 수 없습니다.";

    /**
     * 이 게시물 작성자랑 토큰 유저랑 같은지?
     */
    if (foundGuestBook.authorId !== authorId) {
      return res.status(403).json("권한이 없습니다.");
    } else {
      /**
       * 삭제
       */
      const result = await GuestBookService.deleteGuestBookByGuestBookId({
        guestBookId: req.params.guestBookId,
      });

      if (result.errorMessage) throw "삭제 에러 발생";
      return res.status(200).json("삭제 완료");
    }
  });

guestBookRouter
  .route("/guestBooks/:receiverId/:guestBookId/remove/receiver")
  .delete(login_required, async (req, res) => {
    //여기서 작성자는 누구?
    const receiverId = req.currentUserId;

    const foundGuestBook = await GuestBookService.findOneGuestBookById(
      req.params.guestBookId
    );

    if (foundGuestBook.errorMessage) throw "해당 방명록을 찾을 수 없습니다.";

    /*이 게시물 receiverId랑 의 토큰의 userId랑 같은지? */
    if (foundGuestBook.receiverId !== receiverId) {
      return res.status(403).json("권한이 없습니다.");
    } else {
      /**
       * 삭제
       */
      const result = await GuestBookService.deleteGuestBookByGuestBookId({
        guestBookId: req.params.guestBookId,
      });

      if (result.errorMessage) throw "삭제 에러 발생";
      return res.status(200).json("삭제 완료");
    }
  });

export default guestBookRouter;
