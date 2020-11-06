import { Robomaker } from "../utils";
import Potato from "../models/potato";

/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class Nordo extends Robomaker {
    public static nordo;
    readonly potatoModel: Potato;
    private boilingTime = 1000;

    constructor() {
        super();
        this.potatoModel = Potato.getInstance();
    }

    public static async getInstance(): Promise<Nordo> {
        if (!this.nordo) {
            this.nordo = new Nordo();
            await this.nordo.init("nordo", "bizar", "nordo");
            return this.nordo;
        }
        return this.nordo;
    }

    async boilPotato(orderUuid) {
        await this.potatoModel.boilPotato(orderUuid);
        return new Promise(resolve => setTimeout(resolve, this.boilingTime));
    }
}
