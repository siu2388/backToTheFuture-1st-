import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class ProjectService {
  static async addProject({
    userId,
    title,
    startDate,
    endDate,
    archive,
    description,
  }) {
    const id = uuidv4();

    const newProject = {
      id,
      userId,
      title,
      startDate,
      endDate,
      archive,
      description,
    };

    if (
      !newProject.title ||
      !newProject.startDate ||
      !newProject.endDate ||
      !newProject.description
    ) {
      const errorMessage =
        "Project 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(newProject.startDate).isBefore(moment(today))) {
      const errorMessage =
        "날짜 입력이 잘못되었습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (
      newProject.endDate &&
      !moment(newProject.startDate).isBefore(moment(newProject.endDate))
    ) {
      const errorMessage =
        "Project 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    const project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage =
        "Project 조회: 해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static async getProjectList({ userId }) {
    const projects = await Project.findByUserId({ userId });
    return projects;
  }

  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage =
        "Project 조회: 해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const today = new Date();
    if (!moment(toUpdate.startDate).isBefore(moment(today))) {
      const errorMessage =
        "날짜 입력이 잘못되었습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (
      toUpdate.endDate &&
      !moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate))
    ) {
      const errorMessage =
        "Project 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.archive) {
      const fieldToUpdate = "archive";
      const newValue = toUpdate.archive;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteProject({ projectId }) {
    const isDataDeleted = await Project.deleteById({ projectId });

    if (!isDataDeleted) {
      const errorMessage =
        "Project 삭제: 해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { ProjectService };
