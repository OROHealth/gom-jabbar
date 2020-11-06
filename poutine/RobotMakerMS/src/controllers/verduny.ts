import { Order } from "../models";
import { Verduny } from "../services";
import { logger } from "../utils";


export const verdunyController = async (data) => {
    const uuid = JSON.parse(data.value).message;

    logger.info("Verduny: Received Order...");

    const verduny = await Verduny.getInstance();

    // get order model to change the current recipe step
    const orderModel = new Order();

    // Verduny works
    const potato = await verduny.cutPotato(uuid, 1, 1, 1);
    logger.info("Verduny: Cut Potato in 1x1x1 dimensions");
    await orderModel.incrementStep(uuid);

    logger.info("Verduny: Dipping Potato in maple syrup for 25 seconds...");
    await verduny.mapleDip(potato);
    await orderModel.incrementStep(uuid);

    // pass order to the next robot
    await verduny.publish(uuid);
};
