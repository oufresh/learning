import express, { Request, Response, Router, json } from "express";
import helmet from "helmet";
import logger from "./logger";

// Create Express server
const app = express();
app.use(helmet());

const apiRouter = Router();

apiRouter.use(json());

apiRouter.post("/pay", (req: Request, resp: Response) => {
  logger.info("------------------");
  logger.info("Pay request");
  logger.info(req.body);
  logger.info("------------------");
  const transaction = "tr-id-" + new Date().getTime();
  if (req.body.price !== undefined && req.body.orderId !== undefined) {
    resp.send({
      id: transaction,
      orderId: req.body.orderId
    });
  } else {
    resp.status(400).send("Pay request incorrect");
  }
});

app.use("/api", apiRouter);

export default app;
