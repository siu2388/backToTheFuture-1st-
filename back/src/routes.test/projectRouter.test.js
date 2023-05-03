import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("projectRouter", () => {
  let token;
  let user_id;
  let project_id;

  beforeAll(async () => {
    await request(app)
      .post("/user/register")
      .set("Content-Type", "application/json")
      .send({
        name: "tester1",
        email: "abc@def.com",
        password: "1234",
      });
    const res = await request(app)
      .post("/user/login")
      .set("Content-Type", "application/json")
      .send({ email: "abc@def.com", password: "1234" });

    token = res.body.token;
    user_id = res.body.id;
  });

  afterAll(() => {
    closeDatabase();
  });

  describe("post -> /project/create", () => {
    it("should create a new project in userDB", async () => {
      const res = await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project",
          startDate: "23.04.24",
          endDate: "23.05.06",
          archive: "awesome_archive",
          description: "awesome",
        });

      project_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("awesome_project");
      expect(res.body.startDate).toBe("23.04.24");
      expect(res.body.endDate).toBe("23.05.06");
      expect(res.body.archive).toBe("awesome_archive");
      expect(res.body.description).toBe("awesome");
    });
  });

  describe("get -> /projectId/:id", () => {
    it("should return a project information", async () => {
      const res = await request(app)
        .get(`/projectId/${project_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_project");
    });
  });

  describe("put -> /projectId/:id", () => {
    it("should change a project information", async () => {
      const res = await request(app)
        .put(`/projectId/${project_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "awesome_project2",
          startDate: "23.04.24",
          endDate: "23.05.06",
          archive: "awesome_archive2",
          description: "awesome2",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_project2");
      expect(res.body.startDate).toBe("23.04.24");
      expect(res.body.endDate).toBe("23.05.06");
      expect(res.body.archive).toBe("awesome_archive2");
      expect(res.body.description).toBe("awesome2");
    });
  });

  describe("delete -> /projectId/:id", () => {
    it("should delete project from db", async () => {
      const res = await request(app)
        .delete(`/projectId/${project_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /projectlist/:user_id", () => {
    it("should return a project list for specific user", async () => {
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project3",
          startDate: "23.04.24",
          endDate: "23.05.06",
          archive: "awesome_archive3",
          description: "awesome3",
        });
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project4",
          startDate: "23.04.24",
          endDate: "23.05.06",
          archive: "awesome_archive4",
          description: "awesome4",
        });
      await request(app)
        .post("/project/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_project5",
          startDate: "23.04.24",
          endDate: "23.05.06",
          archive: "awesome_archive5",
          description: "awesome5",
        });

      const res = await request(app)
        .get(`/projectlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
