// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static async addProject({ userId, title, startDate, endDate, archive, description }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newProject = { id, userId, title, startDate, endDate, archive, description };
    
    if (!newProject.startDate) {
      const errorMessage = "Project startDate를 입력해주세요.";
      return { errorMessage };
    }
    if (!newProject.endDate) {
      const errorMessage = "Project endDate를 입력해주세요.";
      return { errorMessage };
    }
    if (newProject.startDate.length !== 8) {
      const errorMessage = "Project startDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newProject.startDate)) {
    //   const errorMessage = "Project startDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newProject.endDate.length !== 8) {
      const errorMessage = "Project endDate를 YYYYMMDD, 8자리로 입력해주세요.";
      return { errorMessage };
    }
    // if (!Number.isInteger(newProject.endDate)) {
    //   const errorMessage = "Project endDate를 YYYYMMDD, 8자리 정수로 입력해주세요.";
    //   return { errorMessage };
    // }
    if (newProject.startDate > newProject.endDate) {
      const errorMessage = "Project startDate가 endDate보다 나중일 순 없습니다.";
      return { errorMessage };
    }
    if (newProject.startDate[4] > 1) {
      const errorMessage = "Project startDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.startDate[5] > 2) {
      const errorMessage = "Project startDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.startDate[6] > 3) {
      const errorMessage = "Project startDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.startDate[6] === '3' && newProject.startDate[7] > 1 ) {
      const errorMessage = "Project startDate의 day 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.endDate[4] > 1) {
      const errorMessage = "Project endDate의 month 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.endDate[5] > 2) {
      const errorMessage = "Project endDate의 month 둘째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.endDate[6] > 3) {
      const errorMessage = "Project endDate의 day 첫째 자리를 잘못 입력했습니다.";
      return { errorMessage };
    }
    if (newProject.endDate[6] === '3' && newProject.endDate[7] > 1 ) {
      const errorMessage = "Project endDate의 day 둘째 자리를 잘못 입력했습니다.";
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
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
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
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
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

      if (newValue.length !== 8) {
        const errorMessage = "Project startDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Project startDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요.";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Project startDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Project startDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Project startDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Project startDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      
      if (newValue.length !== 8) {
        const errorMessage = "Project endDate를 YYYYMMDD, 8자리로 입력해서 수정해주세요.";
        return { errorMessage };
      }
      // if (!Number.isInteger(newValue)) {
      //   const errorMessage = "Project endDate를 YYYYMMDD, 8자리 정수로 입력해서 수정해주세요!";
      //   return { errorMessage };
      // }
      if (newValue[4] > 1) {
        const errorMessage = "Project endDate의 month 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[5] > 2) {
        const errorMessage = "Project endDate의 month 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] > 3) {
        const errorMessage = "Project endDate의 day 첫째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }
      if (newValue[6] === '3' && newValue[7] > 1 ) {
        const errorMessage = "Project endDate의 day 둘째 자리를 잘못 입력했습니다.";
        return { errorMessage };
      }

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
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { ProjectService };
