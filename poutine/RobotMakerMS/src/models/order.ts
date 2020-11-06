import { Connections, constants } from "../utils";
import { v4 as uuidv4 } from "uuid";

// TODO:: Assumption: All orders have to be Poutine and nothing else
//  and No other Robots can exist other than the specified ones here
export default class Order {
    private redis;
    readonly STEP_MAX = 11;

    constructor() {
        this.redis = Connections.get(constants.CONNECTIONS.REDIS);
    }

    public async create(userUuid, item, oil) {
        const uuid: string = uuidv4();
        await this.set(uuid, {"item": item, "step": 0, "potato": undefined, "userUuid": userUuid, "state": "PENDING", "oil": oil});
        return uuid;
    }

    public async incrementStep(uuid) {
        const order = await this.get(uuid);
        if (order.step >= this.STEP_MAX)
            throw new Error("Max Step exceeded!");
        order.step += 1;
        await this.set(uuid, order);
    }

    public async set(key: string, value) {
        await this.redis.set(key, JSON.stringify(value));
    }

    public async terminate(orderUuid) {
        const order = await this.get(orderUuid);
        order.state = "DONE";
        await this.set(orderUuid, order);
    }

    public async get(key: string) {
        const result = await this.redis.get(key);
        return JSON.parse(result);
    }
}
