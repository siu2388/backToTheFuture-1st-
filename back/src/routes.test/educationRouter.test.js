import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("educationRouter", () => {
  let token;
  let user_id;
  let education_id;

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

  describe("post -> /education/create", () => {
    it("should create a new education in userDB", async () => {
      const res = await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          schoolName: "awsome_school",
          schoolType: "university",
          major: "computer",
          status: "graduate",
          startDate: "20.03.02",
          endDate: "23.02.17",
        });

      education_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.schoolName).toBe("awsome_school");
      expect(res.body.schoolType).toBe("university");
      expect(res.body.major).toBe("computer");
      expect(res.body.status).toBe("graduate");
      expect(res.body.startDate).toBe("20.03.02");
      expect(res.body.endDate).toBe("23.02.17");
    });
  });

  describe("get -> /educations/:id", () => {
    it("should return a education information", async () => {
      const res = await request(app)
        .get(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_education");
    });
  });

  describe("put -> /educations/:id", () => {
    it("should change a education information", async () => {
      const res = await request(app)
        .put(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          schoolName: "awsome_school2",
          schoolType: "master",
          major: "chemistry",
          status: "graduate",
          startDate: "19.03.04",
          endDate: "23.02.17",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.schoolName).toBe("awsome_school2");
      expect(res.body.schoolType).toBe("master");
      expect(res.body.major).toBe("chemistry");
      expect(res.body.status).toBe("graduate");
      expect(res.body.startDate).toBe("19.03.04");
      expect(res.body.endDate).toBe("23.02.17");
    });
  });

  describe("delete -> /educations/:id", () => {
    it("should delete education from db", async () => {
      const res = await request(app)
        .delete(`/educations/${education_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /educationlist/:user_id", () => {
    it("should return a education list for specific user", async () => {
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          schoolName: "awsome_school3",
          schoolType: "university",
          major: "education",
          status: "graduate",
          startDate: "18.03.02",
          endDate: "22.02.16",
        });
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          schoolName: "awsome_school4",
          schoolType: "university",
          major: "business",
          status: "graduate",
          startDate: "19.03.04",
          endDate: "23.02.17",
        });
      await request(app)
        .post("/education/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          schoolName: "awsome_school5",
          schoolType: "university",
          major: "astronomy",
          status: "graduate",
          startDate: "20.03.02",
          endDate: "23.02.17",
        });

      const res = await request(app)
        .get(`/educationlist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
