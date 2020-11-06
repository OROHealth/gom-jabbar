import { Order } from "../models";
import { Pierre } from "../services";
import { logger } from "../utils";


export const pierreController = async (data) => {
    const orderUuid = JSON.parse(data.value).message;
    const topic = data.topic;

    const pierre = await Pierre.getInstance();

    switch (topic) {
        case "pierre":
            logger.info("Pierre: Received Order...");

            // get order model to change the current recipe step
            const orderModel = new Order();

            // Pierre works
            await pierre.mixInCardBoax(orderUuid);
            logger.info("Pierre: Mixed up all of the fried potatoes, gravy and cheese into a cardboax");
            await orderModel.incrementStep(orderUuid);

            // wait for this order until montroyashi says that its user is drunk & it is past 2am
            break;
        case "userReady":
            // pass order to needy user, ie: drunk people after 2am
            const orderState = await pierre.getOrderState(orderUuid);
            const time = pierre.getTime();
            if (orderState != "DONE") {
                if (time >= 0.5) {
                    await pierre.publish(orderUuid);
                    logger.info("Pierre: Sent order to needy user!");
                    await pierre.finishOrder(orderUuid);
                }
                else
                    logger.info("Pierre: Time is not past 2AM yet!");
            }
            break;
        default:
            logger.info("Pierre: Unknown Event...");
    }
};
