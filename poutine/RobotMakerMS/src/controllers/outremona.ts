import { Order } from "../models";
import { Outremona } from "../services";
import { logger } from "../utils";


export const outremonaController = async (data) => {
    const uuid = JSON.parse(data.value).message;

    const outremona = await Outremona.getInstance();

    // Create a new order
    const orderModel = new Order();

    // outremona works
    const cheese = await outremona.takeCheese(uuid);
    logger.info("Outremona: Took Cheese");
    await await orderModel.incrementStep(uuid);

    await outremona.squeezeCheese(cheese);
    logger.info("Outremona: Squeezed Cheese");
    await orderModel.incrementStep(uuid);

    await outremona.publish(uuid);

};
