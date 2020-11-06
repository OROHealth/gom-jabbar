import { Robomaker } from "../utils";
import Potato from "../models/potato";

/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class Bizar extends Robomaker {
    public static bizar;
    readonly potatoModel: Potato;
    private fryingTime = 1000;

    constructor() {
        super();
        this.potatoModel = Potato.getInstance();
    }

    public static async getInstance(): Promise<Bizar> {
        if (!this.bizar) {
            this.bizar = new Bizar();
            await this.bizar.init("bizar", "montroyashi", "bizar");
            return this.bizar;
        }
        return this.bizar;
    }

    async fryPotato(orderUuid) {
        await this.potatoModel.fryPotato(orderUuid);
        return new Promise(resolve => setTimeout(resolve, this.fryingTime));
    }
}
