import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const userAuthRouter = Router();

//multer
//uploads 파일 생성관련
try {
  fs.readdirSync("uploads");
} catch (e) {
  console.error("upload 폴더가 없어서 uploads폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext) + Date.now() + ext;
    console.log(path.basename(file.originalname, ext));
    cb(null, filename);
  },
});
const limits = { fieldsize: 10 * 1024 * 1024 };
const upload = multer({ storage: storage, limits: limits });

// 회원가입
userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { name, email, password } = req.body;

    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }
    res.status(201).json(newUser);
    return;
  } catch (error) {
    next(error);
  }
});

//로그인
userAuthRouter.post("/user/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }
    res.status(200).send(user);
    return;
  } catch (error) {
    next(error);
  }
});

//전체 사용자 리스트
userAuthRouter.get("/userlist", login_required, async (req, res, next) => {
  try {
    const users = await userAuthService.getUsers();

    res.status(200).send(users);
    return;
  } catch (error) {
    next(error);
  }
});

//현재 유저 정보 조회
userAuthRouter.get("/user/current", login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }
    res.status(200).send(currentUserInfo);
    return;
  } catch (error) {
    next(error);
  }
});

//유저 정보 업데이트
userAuthRouter.put(
  "/userId/:id",
  login_required,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;

      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const github = req.body.github ?? null;
      const blog = req.body.blog ?? null;
      const description = req.body.description ?? null;

      const homeName = req.body.homeName ?? null;
      const bgColor = req.body.bgColor ?? null;
      const boxColor = req.body.boxColor ?? null;
      const menuColor = req.body.menuColor ?? null;

      const image = req.file ?? null;

      const toUpdate = {
        name,
        email,
        password,
        github,
        blog,
        description,
        homeName,
        bgColor,
        boxColor,
        menuColor,
        image,
      };

      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }
      res.status(200).json(updatedUser);
      return;
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get("/userId/:id", login_required, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }
    res.status(200).send(currentUserInfo);
    return;
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };
