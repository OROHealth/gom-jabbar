import { Robomaker } from "../utils";
import { Gravy } from "../models";
/**
 * Business Logic function:
 */
export class Oldoporto extends Robomaker {
    public static oldoporto;
    private keepingTime = 1000;
    private stirringTime = 1000;
    private gravyModel: Gravy;

    constructor() {
        super();
        this.gravyModel = Gravy.getInstance();
    }

    public static async getInstance(): Promise<Oldoporto> {
        if (!this.oldoporto) {
            this.oldoporto = new Oldoporto();
            await this.oldoporto.init("oldoporto", "pierre", "oldoporto");
            return this.oldoporto;
        }
        return this.oldoporto;
    }

    async stirGravy(orderUuid) {
        await this.gravyModel.createGravy(orderUuid);
        return new Promise(resolve => setTimeout(resolve, this.stirringTime));
    }

    keepAtTemperature(temperature) {
        return new Promise(resolve => setTimeout(resolve, this.keepingTime));
    }
}
