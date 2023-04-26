import is from "@sindresorhus/is";
import { Router } from "express";
import { awardAuthService } from "../services/awardService";
const awardAuthRouter = Router();

awardAuthRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const description = req.body.description;


    // 위 데이터를 유저 db에 추가하기
    const newAward = await awardAuthService.addAward({
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});


awardAuthRouter.get(
  "/awardlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const awards = await userAuthService.getAwards();
      res.status(200).send(awards);
    } catch (error) {
      next(error);
    }
  }
);



awardAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;

      const description = req.body.description ?? null;

      const toUpdate = { title, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await awardAuthService.setAward({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

awardAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentAward = await awardAuthService.getAward({ user_id });

      if (currentAward.errorMessage) {
        throw new Error(currentAward.errorMessage);
      }

      res.status(200).send(currentAward);
    } catch (error) {
      next(error);
    }
  }
);


export { awardAuthRouter };
