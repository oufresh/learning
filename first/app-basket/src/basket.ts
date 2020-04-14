import { Request, Response, Router } from "express";
import { json } from "express";
import config from "config";
import axios, { AxiosResponse } from "axios";
import { v1 as uuidv1 } from "uuid";
import logger from "./logger";

export const basketRouter = Router();

// middleware that is specific to this router, jeson parser
basketRouter.use(json());

export type Book = {
  id: number;
  title: string;
  price: number;
};

const baskets = new Map<string, Array<Book>>();

basketRouter.post("/create", (req: Request, res: Response) => {
  const uuid = uuidv1();
  baskets.set(uuid, []);
  res.send({ basketId: uuid });
});

basketRouter.put("/add", (req: Request, res: Response) => {
  const uuid = req.body.basketId;
  const book = req.body.book;
  baskets.set(uuid, [...baskets.get(uuid), book]);
  res.send({ basketId: uuid, totalBooks: baskets.size });
});

basketRouter.get("/get", (req: Request, res: Response) => {
  const basketId = req.query.basketId;
  if (basketId) {
    const basket = baskets.get(basketId);
    if (basket) {
      res.send({ basketId, elements: basket, total: basket.map(b => b.price).reduce((p, c) => p+ c, 0) });
    } else res.status(404).send("No basket found");
  } else res.status(400).send("No baskeId");
});

// define the home page route
basketRouter.post("/buy", async (req: Request, res: Response) => {
  //ora chiamamiamo il il buy diretto
  //poi questo verrà fatto nel microservice order
  //e metteremo su una saga la creazione delle'ordine e il pagamento
  //che se non va a buon fine toglie l'oride.
  //Il tutto poi finisce al servizio di sppedizione che mette in evaso o no l'ordine.

  try {
    const orderUrl = config.get<string>("order.createUrl");
    const confirmUrl = config.get<string>("order.confirmUrl");
    const buyUrl = config.get<string>("buy.url");
    const basketId = req.body.basketId;

    const basket = baskets.get(basketId);

    const orderResponse = await axios.post(orderUrl, {
      elements: basket,
    });

    logger.info("Oreder created: ", orderResponse.data);

    const buyResponse: AxiosResponse<{ id: string }> = await axios.post(
      buyUrl,
      {
        price: basket.map(b => b.price).reduce((p, c) => p +c, 0),
        orderId: orderResponse.data.orderId,
      }
    );

    logger.info("Pay transaction received: " + buyResponse.data.id);

    const orderConfirmResponse = await axios.put(confirmUrl, {
      trId: buyResponse.data.id,
      orderId: orderResponse.data.id,
    });

    logger.info("Order confirmed!!! :D");

    res.send({ trId: buyResponse.data.id, orderId: orderResponse.data.id });
  } catch (e) {
    console.error("Error buy");
    res.status(500).send("Buy error");
  }
});
