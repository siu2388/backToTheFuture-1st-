import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";
const multer = require("multer");

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.currentUserId;
    const { title, authority, registerNum, grade } = req.body;

    const newCertificate = await CertificateService.addCertificate({
      userId,
      title,
      authority,
      registerNum,
      grade,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }
    res.status(201).json(newCertificate);
    return;
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificateId/:id", async (req, res, next) => {
  try {
    const certificateId = req.params.id;
    const certificate = await CertificateService.getCertificate({
      certificateId,
    });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }
    res.status(200).send(certificate);
    return;
  } catch (error) {
    next(error);
  }
});

certificateRouter.put(
  "/certificateId/:id",
  multer().none(),
  async (req, res, next) => {
    try {
      const certificateId = req.params.id;

      const title = req.body.title ?? null;
      const authority = req.body.authority ?? null;
      const registerNum = req.body.registerNum ?? null;
      const grade = req.body.grade ?? null;

      const toUpdate = { title, authority, registerNum, grade };

      const certificate = await CertificateService.setCertificate({
        certificateId,
        toUpdate,
      });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }
      res.status(200).send(certificate);
      return;
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete("/certificateId/:id", async (req, res, next) => {
  try {
    const certificateId = req.params.id;

    const result = await CertificateService.deleteCertificate({
      certificateId,
    });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificatelist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const certificateList = await CertificateService.getCertificateList({
      userId,
    });
    res.status(200).send(certificateList);
    return;
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };
