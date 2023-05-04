import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CareerService } from "../services/careerService";
const multer = require("multer");

const careerRouter = Router();
careerRouter.use(login_required);

careerRouter.post("/career/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const { company, department, position, description, startDate, endDate } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newCareer = await CareerService.addCareer({
      userId,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    res.status(201).json(newCareer);
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careerId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const careerId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const career = await CareerService.getCareer({ careerId });

    if (career.errorMessage) {
      throw new Error(career.errorMessage);
    }

    res.status(200).send(career);
  } catch (error) {
    next(error);
  }
});

careerRouter.put("/careerId/:id", multer().none(), async (req, res, next) => {
  try {
    // URI로부터 경력 데이터 id를 추출함.
    const careerId = req.params.id;

    // body data 로부터 업데이트할 경력 정보를 추출함.
    const company = req.body.company ?? null;
    const department = req.body.department ?? null;
    const position = req.body.position ?? null;
    const description = req.body.description ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = {
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const career = await CareerService.setCareer({ careerId, toUpdate });

    if (career.errorMessage) {
      throw new Error(career.errorMessage);
    }

    res.status(200).send(career);
  } catch (error) {
    next(error);
  }
});

//경력목록 삭제
careerRouter.delete("/careerId/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const careerId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await CareerService.deleteCareer({ careerId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자의 전체 경력 목록을 얻음
careerRouter.get("/careerlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const careerList = await CareerService.getCareerList({ userId });
    res.status(200).send(careerList);
  } catch (error) {
    next(error);
  }
});

export { careerRouter };
