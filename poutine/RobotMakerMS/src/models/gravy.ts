import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class Gravy {

    public static Gravy;
    private gravyModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.gravy_collection;
        this.setDbModel();
    }

    public static getInstance(): Gravy {
        if (!this.Gravy) {
            this.Gravy = new Gravy();
            return this.Gravy;
        }
        return this.Gravy;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
                orderUuid: {
                    type: String,
                    required: true
                },
                sauce: {
                    type: String,
                    default: "secret"
                },
            },
            {
                collection:  this.collectionName
            });
        this.gravyModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }

    public async createGravy(orderUuid) {
        return await this.gravyModel.create({orderUuid});
    }

    public async getGravy(orderUuid) {
        const queryFilter = {
            orderUuid
        };
        const gravy =  await this.gravyModel.find(queryFilter, {}, {lean: true});
        return gravy[0];
    }

}
