import * as express from "express";
import middleware from "../middlewares";
import { poutineOrderController } from "../controllers";

const router = express.Router();

router.get("/v1/order/:userid&:oil", middleware.defaultMiddleware, poutineOrderController);

export default router;
