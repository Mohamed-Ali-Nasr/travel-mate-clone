import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import env from "./utils/validateEnv";
import createHttpError, { isHttpError } from "http-errors";
import routes from "./routes";
import imageRouter from "./routes/image";

/* Configuration */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Creating Server */
const PORT = env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

/* Mongoose Setup */
mongoose.Promise = Promise;
mongoose
  .connect(env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((error) => {
    console.log("Unable to connect to Mongo : ");
    console.log(error);
  });
mongoose.connection.on("error", (error: Error) => console.log(error));

/* Routes */
app.use("/image", imageRouter);
app.use("/api", routes());

/* Error Handling */
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
