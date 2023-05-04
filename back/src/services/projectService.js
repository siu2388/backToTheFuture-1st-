// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class ProjectService {
  static async addProject({ userId, title, startDate, endDate, archive, description }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newProject = { id, userId, title, startDate, endDate, archive, description };
    
    // 공란일 경우, 에러 메시지 반환
    if (!newProject.title || !newProject.startDate || !newProject.endDate || !newProject.description) {
      const errorMessage = 
        "Project 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((newProject.endDate) && (!moment(newProject.startDate).isBefore(moment(newProject.endDate)))){
      const errorMessage =
        "Project 추가: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "Project 조회: 해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // startDate가 endDate보다 나중일 경우, 에러 메시지 반환
    if((toUpdate.endDate) && (!moment(toUpdate.startDate).isBefore(moment(toUpdate.endDate)))){
      const errorMessage =
        "Project 수정: startDate가 endDate보다 나중일 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "Project 삭제: 해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { ProjectService };
