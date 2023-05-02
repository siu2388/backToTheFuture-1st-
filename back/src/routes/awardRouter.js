import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";
const multer = require("multer");

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/award/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const { title, grade, date, description } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await AwardService.addAward({
      userId,
      title,
      grade,
      date,
      description,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const awardId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const award = await AwardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awardId/:id", multer().none(), async (req, res, next) => {
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const awardId = req.params.id;

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const grade = req.body.grade ?? null;
    const date = req.body.date ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, grade, date, description };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const award = await AwardService.setAward({ awardId, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

//수상목록 삭제
awardRouter.delete("/awardId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const awardId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자의 전체 수상 목록을 얻음
awardRouter.get("/awardlist/:userId", async (req, res, next) => {
  try {
    // @ts-ignore
    const userId = req.params.userId;
    const awardList = await AwardService.getAwardList({ userId });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
