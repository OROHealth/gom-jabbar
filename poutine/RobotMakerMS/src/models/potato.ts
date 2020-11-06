import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class Potato {

    public static Potatoe;
    private potatoModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.potatoe_collection;
        this.setDbModel();
    }

    public static getInstance(): Potato {
        if (!this.Potatoe) {
            this.Potatoe = new Potato();
            return this.Potatoe;
        }
        return this.Potatoe;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
                orderUuid: {
                    type: String,
                    required: true
                },
                width: {
                    type: Number,
                    required: true
                },
                length: {
                    type: Number,
                    required: true
                },
                height: {
                    type: Number,
                    required: true
                },
                state: {
                    type: String,
                    enum : ["RAW", "MAPLE_DIPPED", "BOILED", "FRIED"],
                    default: "RAW"
                },
            },
            {
                collection:  this.collectionName
            });
        this.potatoModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }

    public async getAllPotatoes() {
        const queryFilter = {
        };
        return  await this.potatoModel.find(queryFilter, {}, {lean: true});
    }

    public async getPotato(orderUuid) {
        const queryFilter = {
            orderUuid
        };
        const potato =  await this.potatoModel.find(queryFilter, {}, {lean: true});
        return potato[0];
    }

    public async boilPotato(orderUuid) {
        return await this.potatoModel.updateOne({ orderUuid }, { state: "BOILED" });
    }

    public async fryPotato(orderUuid) {
        return await this.potatoModel.updateOne({ orderUuid }, { state: "FRIED" });
    }

    public async createPotatoCube(orderUuid, width, length, height) {
        return await this.potatoModel.create({orderUuid, width, length, height});
    }

}
