import { Order } from "../models";
import { Montroyashi } from "../services";
import { logger } from "../utils";


export const montroyashiController = async (data) => {
    const orderUuid = JSON.parse(data.value).message;
    const topic = data.topic;
    // get order model to change the current recipe step
    const orderModel = new Order();
    const order = await orderModel.get(orderUuid);
    switch (topic) {
        case "montroyashi":
            logger.info("Montroyashi: Received Order...");

            const montroyashi = await Montroyashi.getInstance();

            // Montroyashi works
            const lyrics = await montroyashi.sing();
            logger.info("Montroyashi: " + lyrics);
            await orderModel.incrementStep(orderUuid);

            // pass order to the next robot
            await montroyashi.publish(orderUuid);
            break;

        case "beer":
            logger.info("Montroyashi: User drunk a beer...");
            const drunkHandler = await Montroyashi.getDrunkHandlerInstance();
            const userState = await drunkHandler.increaseBeersNumForUser(order.userUuid);
            if (userState == "DRUNK") {
                await drunkHandler.publish(orderUuid);
            }
            break;

        default:
            logger.info("Montroyashi: Unknown Order...");
    }
};
