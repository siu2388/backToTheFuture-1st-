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
    const userId = req.currentUserId;
    const { title, grade, date, description } = req.body;

    const newAward = await AwardService.addAward({
      userId,
      title,
      grade,
      date,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }
    res.status(201).json(newAward);
    return;
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardId/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id;
    const award = await AwardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.status(200).send(award);
    return;
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awardId/:id", multer().none(), async (req, res, next) => {
  try {
    const awardId = req.params.id;

    const title = req.body.title ?? null;
    const grade = req.body.grade ?? null;
    const date = req.body.date ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, grade, date, description };

    const award = await AwardService.setAward({ awardId, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.status(200).send(award);
    return;
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awardId/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id;
    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const awardList = await AwardService.getAwardList({ userId });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
