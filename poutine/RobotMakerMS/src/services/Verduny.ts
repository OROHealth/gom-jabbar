import { Robomaker } from "../utils";
import Potato from "../models/potato";

/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class Verduny extends Robomaker {
    public static verduny;
    readonly potatoModel: Potato;
    private dippingTime = 25000;

    constructor() {
        super();
        this.potatoModel = Potato.getInstance();
    }

    public static async getInstance(): Promise<Verduny> {
        if (!this.verduny) {
            this.verduny = new Verduny();
            await this.verduny.init("verduny", "nordo", "verduny");
            return this.verduny;
        }
        return this.verduny;
    }

    // TODO:: Assumption: Unlimited Inventory of Potato
    async cutPotato(orderUuid, width, length, height) {
        return await this.potatoModel.createPotatoCube(orderUuid, width, length, height);
    }

    async mapleDip(potatoDoc) {
        potatoDoc.state = "MAPLE_DIPPED";
        await potatoDoc.save();
        return new Promise(resolve => setTimeout(resolve, this.dippingTime));
    }
}
