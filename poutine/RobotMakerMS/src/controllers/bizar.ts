import { Order } from "../models";
import { Bizar } from "../services";
import { logger } from "../utils";


export const bizarController = async (data) => {
    const uuid = JSON.parse(data.value).message;

    logger.info("Bizar: Received Order...");

    const bizar = await Bizar.getInstance();

    // get order model to change the current recipe step
    const orderModel = new Order();
    const order = await orderModel.get(uuid);

    // Bizar works
    await bizar.fryPotato(uuid);
    logger.info(`Bizar: Fried Potato with ${order.oil} oil`);
    await orderModel.incrementStep(uuid);

    // pass order to the next robot
    await bizar.publish(uuid);
};
