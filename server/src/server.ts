import "reflect-metadata";
import express, { Request, Response } from "express";
import 'express-async-errors';
import router from "./routes/index.ts";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();

app.use(express.json());

// Routing
app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Server running...</h1>');
});

app.use(router);

// Not Found Path
app.use('*', notFound);

// Errors
app.use(errorHandler);

export default app;