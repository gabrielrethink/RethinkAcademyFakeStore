import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./Routes/router";
import { errorMiddleware } from "./Middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Rethink Fake Store - V1" });
});

app.use("/api/v1", router);

app.use("/", errorMiddleware);

app.use("*", (_req: Request, res: Response) =>
  res.status(404).json({
    message: "It looks like you've reached a URL that doesn't exist. ",
  })
);

app.listen(process.env.PORT, () => {
  console.log(`App listen on port: ${process.env.PORT}`);
});
