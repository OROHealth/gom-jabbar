import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class User {

    public static User;
    private userModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.user_collection;
        this.setDbModel();
    }

    public static getInstance(): User {
        if (!this.User) {
            this.User = new User();
            return this.User;
        }
        return this.User;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
                userUuid: {
                    type: String,
                    unique: true,
                    required: true
                },
                state: {
                    type: String,
                    enum: ["SOBER", "DRUNK"],
                    default: "SOBER"
                },
                beersNum: {
                    type: Number,
                    default: 0
                },
                beerTolerance: {
                    type: Number,
                    default: 3
                }
            },
            {
                collection: this.collectionName
            });
        this.userModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }

    public async findUser(userUuid) {
        return await this.userModel.findOne({userUuid});
    }

    public async increaseBeers(userUuid) {
        let state = "SOBER";
        const user = await this.findUser(userUuid);
        if ((user.beersNum + 1) > user.beerTolerance) {
            state = "DRUNK";
        }
        user.state = state;
        user.beersNum += 1;
        return await user.save();
    }


    public async createUser(userUuid, orderUuid) {
        const user = await this.userModel.create({userUuid, orderUuid});
        return user;
    }

}
