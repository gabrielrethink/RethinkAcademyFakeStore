import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import { router } from "./Routes/router";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Rethink Fake Store - V1" });
});

app.use("/api/v1", router);

app.use("*", (_req: Request, res: Response) =>
  res.status(404).json({
    message: "It looks like you've reached a URL that doesn't exist. ",
  })
);

app.listen(process.env.PORT, () => {
  console.log(`App listen on port: ${process.env.PORT}`);
});
