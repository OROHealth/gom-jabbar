import { Robomaker } from "../utils";
import { Cheese } from "../models";


/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class Outremona extends Robomaker {
    public static outremona;
    private cheeseModel: Cheese;
    readonly squeezingTime = 1000;

    constructor() {
        super();
        this.cheeseModel = Cheese.getInstance();
    }

    public static async getInstance(): Promise<Outremona> {
        if (!this.outremona) {
            this.outremona = new Outremona();
            await this.outremona.init("outremona", "verduny", "outremona");
            return this.outremona;
        }
        return this.outremona;
    }

    // TODO:: Assumption: Unlimited Inventory of Cheese
    async takeCheese(orderUuid) {
        return await this.cheeseModel.getHandfulCheese(orderUuid);
    }

    squeezeCheese(cheese) {
        return new Promise(resolve => setTimeout(resolve, this.squeezingTime))
            .then(() => this.cheeseModel.squeeze(cheese));
    }
}
