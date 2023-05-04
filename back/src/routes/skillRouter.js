import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { SkillService } from "../services/skillService";
const multer = require("multer");
const skillRouter = Router();
skillRouter.use(login_required);

skillRouter.post("/skill/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const { skillName, level, period, startDate, endDate } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newSkill = await SkillService.addSkill({
      userId,
      skillName,
      level,
      period,
      startDate,
      endDate,
    });

    res.status(201).json(newSkill);
    return;
  } catch (error) {
    next(error);
  }
});

skillRouter.get("/skillId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const skillId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const skill = await SkillService.getSkill({ skillId });

    if (skill.errorMessage) {
      throw new Error(skill.errorMessage);
    }

    res.status(200).send(skill);
    return;
  } catch (error) {
    next(error);
  }
});

skillRouter.put("/skillId/:id", multer().none(), async (req, res, next) => {
  try {
    // URI로부터 경력 데이터 id를 추출함.
    const skillId = req.params.id;

    // body data 로부터 업데이트할 경력 정보를 추출함.
    const skillName = req.body.skillName ?? null;
    const level = req.body.level ?? null;
    const period = req.body.period ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = { skillName, level, period, startDate, endDate };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const skill = await SkillService.setSkill({ skillId, toUpdate });

    if (skill.errorMessage) {
      throw new Error(skill.errorMessage);
    }

    res.status(200).send(skill);
    return;
  } catch (error) {
    next(error);
  }
});

//경력목록 삭제
skillRouter.delete("/skillId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const skillId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await SkillService.deleteSkill({ skillId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

// 특정 사용자의 전체 경력 목록을 얻음
skillRouter.get("/skilllist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const skillList = await SkillService.getSkillList({ userId });
    res.status(200).send(skillList);
    return;
  } catch (error) {
    next(error);
  }
});

export { skillRouter };
