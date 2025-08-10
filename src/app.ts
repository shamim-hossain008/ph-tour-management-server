import cors from "cors";
import express, { Request, Response } from "express";
import { UserRouters } from "./app/modules/user/user.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", UserRouters);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management system server.........!",
  });
});

export default app;
