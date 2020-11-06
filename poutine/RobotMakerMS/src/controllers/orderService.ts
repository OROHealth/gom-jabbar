import { OrderService } from "../services";
import { logger, statusCode } from "../utils";
import { User } from "../models";


export const poutineOrderController = async (req, res) => {
    const userUuid = req.params.userid;
    const oil = req.params.oil;
    const userModel = User.getInstance();

    logger.info("ORDER:: Received Poutine Order...");

    const orderService = await OrderService.getInstance();

    // Create a new order
    const orderUuid = await orderService.createOrder(userUuid, "poutine", oil);
    await userModel.createUser(userUuid, orderUuid);

    await orderService.publish(orderUuid, "poutine")
        .then(() => logger.info("Order Published to Outremona!"));

    res.status(statusCode.OK_200).send();
};


export const beerOrderController = async (req, res) => {
    const userId = req.params.userid;
    logger.info("ORDER:: Received Beer Order...");

    const orderService = await OrderService.getInstance();

    // Create a new order
    const orderUuid = await orderService.createOrder(userId, "beer", "");

    await orderService.publish(orderUuid, "beer")
        .then(() => logger.info("Beer Order Published to Montroyashi!"));

    res.status(statusCode.OK_200).send("Beer Order Received!");
};
