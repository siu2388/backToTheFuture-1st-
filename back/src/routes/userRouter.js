import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

    // req (request) 에서 데이터 가져오기->사용자 입력정보 가져오기
    const { name, email, password } = req.body;

    // 위 데이터를 유저 db에 추가하기 ->서비스층의 addUser()서비스에 전달
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    //에러처리
    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
//로그인
userAuthRouter.post("/user/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }
    //프론트에 전달
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

//전체 사용자 리스트
userAuthRouter.get("/userlist", login_required, async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userAuthService.getUsers();

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/user/current", login_required, async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put(
  "/users/:id",
  login_required,
  upload.single("image"),
  async (req, res, next) => {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const github = req.body.github ?? null;
      const blog = req.body.blog ?? null;
      const description = req.body.description ?? null;
      // 홈페이지 꾸미기
    const homeName = req.body.homeName ?? null;
    const bgColor = req.body.bgColor ?? null;
    const boxColor = req.body.boxColor ?? null;
    const menuColor = req.body.menuColor ?? null;
      //이미지 업로드
      const image = req.file ?? null;
      console.log("req.file 제발찍혀라", req.file);
      console.log("req.body:", req.body);
userAuthRouter.put("/users/:id", login_required, async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const github = req.body.github ?? null;
    const blog = req.body.blog ?? null;
    const description = req.body.description ?? null;
    //이미지
    const image = req.body.image ?? null;
    // 홈페이지 꾸미기
    const homeName = req.body.homeName ?? null;
    const bgColor = req.body.bgColor ?? null;
    const boxColor = req.body.boxColor ?? null;
    const menuColor = req.body.menuColor ?? null;

      const toUpdate = {
        name,
        email,
        password,
        github,
        blog,
        description,
        image,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get("/users/:id", login_required, async (req, res, next) => {
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
