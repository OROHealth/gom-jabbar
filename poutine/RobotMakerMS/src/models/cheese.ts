import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class Cheese {

    public static Cheese;
    private cheeseModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.cheese_collection;
        this.setDbModel();
    }

    public static getInstance(): Cheese {
        if (!this.Cheese) {
            this.Cheese = new Cheese();
            return this.Cheese;
        }
        return this.Cheese;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
            orderUuid: {
              type: String,
              required: true
            },
            type: {
                type: String,
                enum : ["SQUEAKY"],
                default: "SQUEAKY",
            },
            state: {
                type: String,
                enum : ["RAW", "SQUEEZED"],
                default: "RAW"
            },
            scream: {
                type: String,
                default: "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!"
            }
        },
        {
            collection:  this.collectionName
        });
        this.cheeseModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }

    public async getAllCheese() {
        const queryFilter = {
        };
        return  await this.cheeseModel.find(queryFilter, {}, {lean: true});
    }

    public async getCheese(orderUuid) {
        const queryFilter = {
            orderUuid
        };
        const cheese =  await this.cheeseModel.find(queryFilter, {}, {lean: true});
        return cheese[0];
    }

    public async getHandfulCheese(orderUuid) {
        return await this.cheeseModel.create({orderUuid});
    }

    public async squeeze(cheeseDoc) {
        cheeseDoc.state = "SQUEEZED";
        await cheeseDoc.save();
    }

}
