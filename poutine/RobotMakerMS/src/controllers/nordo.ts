import { Order } from "../models";
import { Nordo } from "../services";
import { logger } from "../utils";


export const nordoController = async (data) => {
    const uuid = JSON.parse(data.value).message;

    logger.info("Nordo: Received Order...");

    const nordo = await Nordo.getInstance();

    // get order model to change the current recipe step
    const orderModel = new Order();

    // Nordo works
    logger.info("Nordo: Boiling Potato");
    await nordo.boilPotato(uuid);
    logger.info("Nordo: Potato is now softish");
    await orderModel.incrementStep(uuid);
    await orderModel.incrementStep(uuid);

    // pass order to the next robot
    await nordo.publish(uuid);
};
