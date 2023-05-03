import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("careerRouter", () => {
  let token;
  let user_id;
  let career_id;

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

  describe("post -> /career/create", () => {
    it("should create a new career in userDB", async () => {
      const res = await request(app)
        .post("/career/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          company: "awesome_career",
          department: "awesome_department",
          position: "awesome_position",
          description: "awesome",
          startDate: "20.03.02",
          endDate: "23.02.17",
        });

      career_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.company).toBe("awesome_career");
      expect(res.body.department).toBe("awesome_department");
      expect(res.body.position).toBe("awesome_position");
      expect(res.body.description).toBe("awesome");
      expect(res.body.startDate).toBe("20.03.02");
      expect(res.body.endDate).toBe("23.02.17");
    });
  });

  describe("get -> /careerId/:id", () => {
    it("should return a career information", async () => {
      const res = await request(app)
        .get(`/careerId/${career_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.company).toBe("awesome_career");
    });
  });

  describe("put -> /careerId/:id", () => {
    it("should change a career information", async () => {
      const res = await request(app)
        .put(`/careerId/${career_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "awesome_career2",
          department: "awesome_department2",
          position: "awesome_position2",
          description: "awesome2",
          startDate: "19.03.04",
          endDate: "23.02.17",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.company).toBe("awesome_career2");
      expect(res.body.department).toBe("awesome_department");
      expect(res.body.position).toBe("awesome_position");
      expect(res.body.description).toBe("awesome2");
      expect(res.body.startDate).toBe("19.03.04");
      expect(res.body.endDate).toBe("23.02.17");
    });
  });

  describe("delete -> /careerId/:id", () => {
    it("should delete career from db", async () => {
      const res = await request(app)
        .delete(`/careerId/${career_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /careerlist/:user_id", () => {
    it("should return a career list for specific user", async () => {
      await request(app)
        .post("/career/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          company: "awesome_career3",
          department: "awesome_department3",
          position: "awesome_position3",
          description: "awesome3",
          startDate: "18.03.02",
          endDate: "22.02.16",
        });
      await request(app)
        .post("/career/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          company: "awesome_career4",
          department: "awesome_department4",
          position: "awesome_position4",
          description: "awesome4",
          startDate: "19.03.04",
          endDate: "23.02.17",
        });
      await request(app)
        .post("/career/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          company: "awesome_career5",
          department: "awesome_department5",
          position: "awesome_position5",
          description: "awesome5",
          startDate: "20.03.02",
          endDate: "23.02.17",
        });

      const res = await request(app)
        .get(`/careerlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
