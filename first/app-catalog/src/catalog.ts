import { Request, Response, Router, NextFunction, json } from "express";
import axios from "axios";
import config from "config";
import logger from "./logger";

export const catalogRouter = Router();

catalogRouter.use(json());

// middleware that is specific to this router
catalogRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Catalog request time: ", Date.now());
  next();
});

// define the home page route
catalogRouter.get("/books", (req: Request, res: Response) => {
  res.send([
    {
      id: 1,
      title: "Title 1",
      descr: "Description of Title 1",
      author: "Author 1",
      price: 50,
    },
    {
      id: 2,
      title: "Title 2",
      descr: "Description of Title 2",
      author: "Author 1",
      price: 35,
    },
    {
      id: 3,
      title: "Title 3",
      descr: "Description of Title 3",
      author: "Author 3",
      price: 47,
    },
  ]);
});

catalogRouter.put("/book", async (req: Request, res: Response) => {
  try {
    //molto semplice se no il catalogo può fare altre logiche
    const book = req.body;
    const url: string = config.get("basket.url");
    if (url) {
      const basketResp = await axios.put(url, book);
      res.send({ basketId: basketResp.data.basketId });
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error basket book");
  }
});