import * as express from "express";
import middleware from "../middlewares";
import { beerOrderController } from "../controllers";

const router = express.Router();

router.get("/v1/beer/:userid", middleware.defaultMiddleware, beerOrderController);

export default router;
