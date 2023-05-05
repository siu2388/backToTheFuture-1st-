import { User } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password }) {
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "회원가입: 이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null;

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "User 조회: 해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "User 조회: 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.id }, secretKey);

    const {
      id,
      name,
      github,
      blog,
      description,
      image,
      homeName,
      bgColor,
      boxColor,
      menuColor,
    } = user;

    const loginUser = {
      token,
      id,
      email,
      name,
      github,
      blog,
      description,
      homeName,
      bgColor,
      boxColor,
      menuColor,
      errorMessage: null,
      image,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    if (!user) {
      const errorMessage =
        "User 조회: 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = bcrypt.hash(toUpdate.password, 10);
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.github) {
      const fieldToUpdate = "github";
      const newValue = toUpdate.github;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.blog) {
      const fieldToUpdate = "blog";
      const newValue = toUpdate.blog;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.homeName) {
      const fieldToUpdate = "homeName";
      const newValue = toUpdate.homeName;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.bgColor) {
      const fieldToUpdate = "bgColor";
      const newValue = toUpdate.bgColor;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.boxColor) {
      const fieldToUpdate = "boxColor";
      const newValue = toUpdate.boxColor;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.menuColor) {
      const fieldToUpdate = "menuColor";
      const newValue = toUpdate.menuColor;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }
    if (toUpdate.image) {
      const fieldToUpdate = "image";
      const newValue = toUpdate.image;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }
  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    if (!user) {
      const errorMessage =
        "User 조회: 해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
