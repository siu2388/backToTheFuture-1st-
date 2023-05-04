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
    const userId = req.currentUserId;
    const { company, department, position, description, startDate, endDate } =
      req.body;

    const newCareer = await CareerService.addCareer({
      userId,
      company,
      department,
      position,
      description,
      startDate,
      endDate,
    });

    if (newCareer.errorMessage) {
      throw new Error(newCareer.errorMessage);
    }
    res.status(201).json(newCareer);
    return;
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careerId/:id", async (req, res, next) => {
  try {
    const careerId = req.params.id;
    const career = await CareerService.getCareer({ careerId });

    if (career.errorMessage) {
      throw new Error(career.errorMessage);
    }
    res.status(200).send(career);
    return;
  } catch (error) {
    next(error);
  }
});

careerRouter.put("/careerId/:id", multer().none(), async (req, res, next) => {
  try {
    const careerId = req.params.id;

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
    const career = await CareerService.setCareer({ careerId, toUpdate });

    if (career.errorMessage) {
      throw new Error(career.errorMessage);
    }

    res.status(200).send(career);
    return;
  } catch (error) {
    next(error);
  }
});

careerRouter.delete("/careerId/:id", async (req, res, next) => {
  try {
    const careerId = req.params.id;
    const result = await CareerService.deleteCareer({ careerId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careerlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const careerList = await CareerService.getCareerList({ userId });
    res.status(200).send(careerList);
    return;
  } catch (error) {
    next(error);
  }
});

export { careerRouter };
