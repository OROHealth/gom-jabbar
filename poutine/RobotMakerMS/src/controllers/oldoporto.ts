import { Order } from "../models";
import { Oldoporto } from "../services";
import { logger } from "../utils";


export const oldoportoController = async (data) => {
    const uuid = JSON.parse(data.value).message;

    logger.info("Oldoporto: Received Order...");

    const oldoporto = await Oldoporto.getInstance();

    // get order model to change the current recipe step
    const orderModel = new Order();

    // Oldoporto works

    // 99C is a temperature before boiling
    await oldoporto.stirGravy(uuid);
    logger.info("Oldoporto: Stirred up the secret gravy sauce");

    await oldoporto.keepAtTemperature(99);
    logger.info("Oldoporto: Keeping the gravy sauce at exact temperature before boiling");
    await orderModel.incrementStep(uuid);

    // pass order to the next robot
    await oldoporto.publish(uuid);
};
