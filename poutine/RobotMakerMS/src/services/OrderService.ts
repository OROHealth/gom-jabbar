import { Order } from "../models";
import KafkaProducer from "../../kafka";
import { logger } from "../utils";

/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class OrderService {
    private order: Order;
    public static orderService: OrderService;
    private poutineProducer: any;
    private beerProducer: any;

    constructor() {
        this.order = new Order();
    }

    public static async getInstance(): Promise<OrderService> {
        if (!this.orderService) {
            this.orderService = new OrderService();
            // Poutine Order
            this.orderService.poutineProducer = await KafkaProducer.initialize("PRODUCER", {
                host: "127.0.0.1",
                topic: "outremona",
                partition: 0
            });

            // Beer Order
            this.orderService.beerProducer = await KafkaProducer.initialize("PRODUCER", {
                host: "127.0.0.1",
                topic: "beer",
                partition: 0
            });

            this.orderService.poutineProducer.on("error", function (err) {
                logger.error("ERROR:: Poutine order: " + err);
            });

            this.orderService.beerProducer.on("error", function (err) {
                logger.error("ERROR:: Beer order: " + err);
            });
            return this.orderService;
        }
        return this.orderService;
    }


    async createOrder(userUuid, item, oil) {
        return this.order.create(userUuid, item, oil);
    }

    async publish(uuid, item) {
        try {
            switch (item) {
                case "poutine":
                    await this.poutineProducer.publish({
                        message: uuid,
                    });
                    break;
                case "beer":
                    await this.beerProducer.publish({
                        message: uuid,
                    });
                    break;
                default:
                    // noinspection ExceptionCaughtLocallyJS
                    throw new Error("This Menu Item does not exist!");
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}
