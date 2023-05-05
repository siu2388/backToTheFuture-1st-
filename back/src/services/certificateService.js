import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static async addCertificate({
    userId,
    title,
    authority,
    registerNum,
    grade,
  }) {
    const id = uuidv4();

    const newCertificate = { id, userId, title, authority, registerNum, grade };

    if (
      !newCertificate.title ||
      !newCertificate.authority ||
      !newCertificate.registerNum ||
      !newCertificate.grade
    ) {
      const errorMessage =
        "Certificate 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  }

  static async getCertificate({ certificateId }) {
    const certificate = await Certificate.findById({ certificateId });

    if (!certificate) {
      const errorMessage =
        "Certificate 조회: 해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }

  static async getCertificateList({ userId }) {
    const certificates = await Certificate.findByUserId({ userId });
    return certificates;
  }

  static async setCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findById({ certificateId });

    if (!certificate) {
      const errorMessage =
        "Certificate 조회: 해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.authority) {
      const fieldToUpdate = "authority";
      const newValue = toUpdate.authority;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.registerNum) {
      const fieldToUpdate = "registerNum";
      const newValue = toUpdate.registerNum;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.grade) {
      const fieldToUpdate = "grade";
      const newValue = toUpdate.grade;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }
    return certificate;
  }

  static async deleteCertificate({ certificateId }) {
    const isDataDeleted = await Certificate.deleteById({ certificateId });

    if (!isDataDeleted) {
      const errorMessage =
        "Certificate 삭제: 해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok" };
  }
}

export { CertificateService };
