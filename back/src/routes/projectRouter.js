import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";
const multer = require("multer");
const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post("/project/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;
    const { title, startDate, endDate, archive, description } = req.body;

    const newProject = await ProjectService.addProject({
      userId,
      title,
      startDate,
      endDate,
      archive,
      description,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }
    res.status(201).json(newProject);
    return;
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projectId/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }
    res.status(200).send(project);
    return;
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projectId/:id", multer().none(), async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const title = req.body.title ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;
    const archive = req.body.archive ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, startDate, endDate, archive, description };

    const project = await ProjectService.setProject({ projectId, toUpdate });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }
    res.status(200).send(project);
    return;
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/projectId/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const result = await ProjectService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projectlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const projectList = await ProjectService.getProjectList({ userId });
    res.status(200).send(projectList);
    return;
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
