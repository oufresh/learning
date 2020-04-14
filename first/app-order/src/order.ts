import { Request, Response, Router, response } from "express";
import { json } from "express";
import { v1 as uuidv1 } from "uuid";
import logger from "./logger";

export const orderRouter = Router();

// middleware that is specific to this router, jeson parser
orderRouter.use(json());

export type Element = {
  id: number;
  title: string;
  price: number;
};

export type Order = {
  elements: Array<Element>;
  confirmed: boolean;
};

const orders = new Map<string, Order>();

orderRouter.post("/create", (req: Request, res: Response) => {
  const uuid = uuidv1();
  orders.set(uuid, { elements: req.body.elements, confirmed: false });
  logger.info("Create order with books:", req.body.elements);
  res.send({ orderId: uuid });
});

orderRouter.put("/confirm", (req: Request, res: Response) => {
  const uuid = req.body.orderId;
  //const order = orders.get(uuid);
  //orders.set(uuid, { elements: order.elements, confirmed: true });
  res.send({ orderId: uuid, confirmed: true });
});

orderRouter.get("/get", (req: Request, res: Response) => {
  const uuid = req.query.uuid;
  if (uuid && orders.get(uuid)) {
    const order = orders.get(uuid);
    res.send({
      total: order.elements
        .map((el: Element) => el.price)
        .reduce((p: number, c: number) => p + c, 0),
      order,
    });
  } else res.status(404).send("Missing order uuid");
});
