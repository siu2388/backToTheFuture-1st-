import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routes/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { awardRouter } from "./routes/awardRouter";
import { certificateRouter } from "./routes/certificateRouter";
import { educationRouter } from "./routes/educationRouter";
import { projectRouter } from "./routes/projectRouter";
import { careerRouter } from "./routes/careerRouter";
import { skillRouter } from "./routes/skillRouter";
import guestBookRouter from "./routes/guestBookRouter";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

app.use(userAuthRouter);
app.use(awardRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(projectRouter);
app.use(careerRouter);
app.use(skillRouter);
app.use(guestBookRouter);

app.use(errorMiddleware);

export { app };
