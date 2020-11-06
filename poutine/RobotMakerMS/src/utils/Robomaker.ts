import KafkaProducer from "../../kafka";
import KafkaConsumer from "../../kafka";
import { logger } from "./index";

export default class Robomaker {
    private producer: any;
    private consumer: any;
    private consumptionTopic: String;
    private productionTopic: String;

    constructor() {
        this.consumptionTopic = "";
        this.productionTopic = "";
    }

    public async init(consumerGroup, productionTopic, consumptionTopic): Promise<any> {
        this.consumptionTopic = consumptionTopic;
        this.productionTopic = productionTopic;

        // Initialize Consumer
        this.consumer = await KafkaConsumer.initialize("CONSUMER", {
            host: "127.0.0.1:9092",
            topic: consumptionTopic,
            groupId: consumerGroup,
        });


        // Initialize Producer
        this.producer = await KafkaProducer.initialize("PRODUCER", {
            host: "127.0.0.1:9092",
            topic: productionTopic,
            partition: 0
        });

        this.producer.on("error", (err) => {
            logger.error(this.consumptionTopic + ":: " + err);
        });

    }

    async publish(msg) {
        try {
            await this.producer.publish({
                message: msg,
            });
            logger.info(this.consumptionTopic + ":: Passed order to " + this.productionTopic + " ;)");
        } catch (e) {
            throw new Error(e);
        }
    }

    registerConsumer(listener) {
        this.consumer.on("message", (data) => {
            listener(data);
        });
        logger.info(this.consumptionTopic + ":: Consumer Registered!");
    }

}
