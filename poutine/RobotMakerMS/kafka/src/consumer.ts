import * as kafka from "kafka-node";
import * as EventEmitter from "events";

import constants from "./utils/constants";
import { logger } from "../../src/utils";

export default class Consumer extends EventEmitter {
    consumer;
    options;

    constructor(config, fromOffset = "latest") {
        super();
        const hosts = config.host;
        const topic = config.topic;
        const groupId = config.groupId;

        this.options =  {
            // host: hosts,
            kafkaHost: hosts,
            groupId: groupId,
            ssl: false, // optional (defaults to false) or tls options hash
            // Auto commit config
            sessionTimeout: 15000,
            // An array of partition assignment protocols ordered by preference.
            // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
            protocol: ["roundrobin"],
            fromOffset: fromOffset,
            outOfRangeOffset: "latest", // default
        };
        if (typeof topic != "string")
            this.consumer = new kafka.ConsumerGroup(this.options, topic);
        else
            this.consumer = new kafka.ConsumerGroup(this.options, [topic]);
        logger.info(`KAFKA_CONSUMERS :: Connected to ${hosts} ready for consuming from topic ${topic}`);
    }

    initializeDriver() {
        return new Promise((resolve, reject) => {
            this.consumer.on("connect", () => {
                logger.info(`KAFKA_CONSUMERS :: Ready for subscribing`);
                this.emit(constants.EventEnums.CONNECTION_SUCCESS);
                resolve();
            });
            this.consumer.on("error", (err) => {
                logger.error(`KAFKA_CONSUMERS :: Error ${err} ${err.stack}`);
                this.emit(constants.EventEnums.CONNECTION_ERROR);
                reject();
            });
        });
    }

    connectionInstance() {
        return this.consumer;
    }
}
