import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { SkillService } from "../services/skillService";

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
    const user_id = req.body.user_id;
    const skillName = req.body.skill;
    const level = req.body.level;
    const period = req.body.period;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // 위 데이터를 유저 db에 추가하기
    const newSkill = await SkillService.addSkill({
      user_id,
      skillName,
      level,
      period,
      startDate,
      endDate,
    });

    res.status(201).json(newSkill);
  } catch (error) {
    next(error);
  }
});

skillRouter.get("/skills/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const skillId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const skill = await SkillService.getSkill({ skillId });

    if (skill.errorMessage) {
      throw new Error(skill.errorMessage);
    }

    res.status(200).send(skill);
  } catch (error) {
    next(error);
  }
});

skillRouter.put("/skills/:id", async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

//경력목록 삭제
skillRouter.delete("/skills/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const skillId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await SkillService.deleteSkill({ skillId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자의 전체 경력 목록을 얻음
skillRouter.get("/skilllist/:user_id", async (req, res, next) => {
  try {
    // @ts-ignore
    const user_id = req.params.user_id;
    const skillList = await SkillService.getSkillList({ user_id });
    res.status(200).send(skillList);
  } catch (error) {
    next(error);
  }
});

export { skillRouter };