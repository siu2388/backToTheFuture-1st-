import { closeDatabase } from "./__config__/dbConfig";
import request from "supertest";
import { app } from "../app";

describe("certificateRouter", () => {
  let token;
  let user_id;
  let certificate_id;

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

  describe("post -> /certificate/create", () => {
    it("should create a new certificate in userDB", async () => {
      const res = await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate",
          authority: "issuing_agency",
          registerNum: "awesome001",
          grade: "first",
        });

      certificate_id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("awesome_certificate");
      expect(res.body.authority).toBe("issuing_agency");
      expect(res.body.registerNum).toBe("awesome001");
      expect(res.body.grade).toBe("first");
    });
  });

  describe("get -> /certificates/:id", () => {
    it("should return a certificate information", async () => {
      const res = await request(app)
        .get(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_certificate");
    });
  });

  describe("put -> /certificates/:id", () => {
    it("should change a certificate information", async () => {
      const res = await request(app)
        .put(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "awesome_certificate2",
          authority: "issuing_agency",
          registerNum: "awesome002",
          grade: "second",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe("awesome_certificate2");
      expect(res.body.authority).toBe("issuing_agency");
      expect(res.body.registerNum).toBe("awesome002");
      expect(res.body.grade).toBe("second");
    });
  });

  describe("delete -> /certificates/:id", () => {
    it("should delete certificate from db", async () => {
      const res = await request(app)
        .delete(`/certificates/${certificate_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("get -> /certificatelist/:user_id", () => {
    it("should return a certificate list for specific user", async () => {
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate3",
          authority: "issuing_agency",
          registerNum: "awesome003",
          grade: "third",
        });
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate4",
          authority: "issuing_agency",
          registerNum: "awesome004",
          grade: "first",
        });
      await request(app)
        .post("/certificate/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          user_id,
          title: "awesome_certificate5",
          authority: "issuing_agency",
          registerNum: "awesome005",
          grade: "second",
        });

      const res = await request(app)
        .get(`/certificatelist/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });
});
