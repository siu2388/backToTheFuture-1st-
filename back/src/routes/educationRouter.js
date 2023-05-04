import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";
const multer = require("multer");
const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;
    const { schoolName, schoolType, major, status, startDate, endDate } =
      req.body;

    const newEducation = await EducationService.addEducation({
      userId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }
    res.status(201).json(newEducation);
    return;
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationId/:id", async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const education = await EducationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }
    res.status(200).send(education);
    return;
  } catch (error) {
    next(error);
  }
});

educationRouter.put(
  "/educationId/:id",
  multer().none(),
  async (req, res, next) => {
    try {
      const educationId = req.params.id;

      const schoolName = req.body.schoolName ?? null;
      const schoolType = req.body.schoolType ?? null;
      const major = req.body.major ?? null;
      const status = req.body.status ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = {
        schoolName,
        schoolType,
        major,
        status,
        startDate,
        endDate,
      };

      const education = await EducationService.setEducation({
        educationId,
        toUpdate,
      });

      if (education.errorMessage) {
        throw new Error(education.errorMessage);
      }
      res.status(200).send(education);
      return;
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete("/educationId/:id", async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const result = await EducationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educationList = await EducationService.getEducationList({ userId });

    res.status(200).send(educationList);
    return;
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
