import { Robomaker } from "../utils";
import { Cheese, Potato, Gravy, CardBoax, Order } from "../models";
/**
 * Business Logic function:
 */
export class Pierre extends Robomaker {
    public static pierre;
    private mixingTime = 1000;

    readonly potatoModel: Potato;
    private cheeseModel: Cheese;
    private gravyModel: Gravy;
    private cardBoaxModel: CardBoax;
    private orderModel: Order;

    constructor() {
        super();
        this.potatoModel = Potato.getInstance();
        this.cheeseModel = Cheese.getInstance();
        this.gravyModel = Gravy.getInstance();
        this.orderModel = new Order();
        this.cardBoaxModel = CardBoax.getInstance();
    }

    public static async getInstance(): Promise<Pierre> {
        if (!this.pierre) {
            this.pierre = new Pierre();
            await this.pierre.init("pierre", "people", ["pierre", "userReady"]);
            return this.pierre;
        }
        return this.pierre;
    }


    async getPotato(orderUuid) {
        return await this.potatoModel.getPotato(orderUuid);
    }

    async getCheese(orderUuid) {
        return await this.cheeseModel.getCheese(orderUuid);
    }

    async getGravy(orderUuid) {
        return await this.gravyModel.getGravy(orderUuid);
    }

    async finishOrder(orderUuid) {
        await this.orderModel.terminate(orderUuid);
    }

    async getOrderState(orderUuid) {
        const order = await this.orderModel.get(orderUuid);
        return order.state;
    }

    async mixInCardBoax(orderUuid) {
        const potatoId = orderUuid;
        const cheeseId = orderUuid;
        const gravyId = orderUuid;
        await this.cardBoaxModel.createCardBoax(orderUuid, potatoId, cheeseId, gravyId);
        return new Promise(resolve => setTimeout(resolve, this.mixingTime));
    }

    getTime() {
        return Math.random();
    }
}
