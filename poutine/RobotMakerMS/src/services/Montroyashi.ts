import { Robomaker } from "../utils";
import { User } from "../models";

/**
 * Business Logic function:
 * take cheese from a box an squeeze it
 */
export class Montroyashi extends Robomaker {
    public static montroyashi;
    public static drunkHandler;
    private userModel: User;

    readonly cohenLyrics: Array<String>;

    constructor() {
        super();
        this.userModel = User.getInstance();
        this.cohenLyrics = [
            "lyric1",
            "lyric2"
        ];
    }

    public static async getInstance(): Promise<Montroyashi> {
        if (!this.montroyashi) {
            this.montroyashi = new Montroyashi();
            await this.montroyashi.init("montroyashi", "oldoporto", "montroyashi");
            return this.montroyashi;
        }
        return this.montroyashi;
    }

    public static async getDrunkHandlerInstance(): Promise<Montroyashi> {
        if (!this.drunkHandler) {
            this.drunkHandler = new Montroyashi();
            await this.drunkHandler.init("beer", "userReady", "beer");
            return this.drunkHandler;
        }
        return this.drunkHandler;
    }

    async increaseBeersNumForUser(userUuid) {
        await this.userModel.increaseBeers(userUuid);
        const user = await this.userModel.findUser(userUuid);
        return user.state;
    }

    sing() {
        return this.cohenLyrics[Math.floor(Math.random() * this.cohenLyrics.length)];
    }
}
