import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class CardBoax {

    public static CardBoax;
    private cardBoaxModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.cardBoax_collection;
        this.setDbModel();
    }

    public static getInstance(): CardBoax {
        if (!this.CardBoax) {
            this.CardBoax = new CardBoax();
            return this.CardBoax;
        }
        return this.CardBoax;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
                orderUuid: {
                    type: String,
                    required: true
                },
                potatoId: {
                    type: String
                },
                cheeseId: {
                    type: String
                },
                gravyId: {
                    type: String
                },
            },
            {
                collection:  this.collectionName
            });
        this.cardBoaxModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }


    public async getCardBoax(orderUuid) {
        const queryFilter = {
            orderUuid
        };
        const cardBoax =  await this.cardBoaxModel.find(queryFilter, {}, {lean: true});
        return cardBoax[0];
    }

    public async createCardBoax(orderUuid, potatoId, cheeseId, gravyId) {
        return await this.cardBoaxModel.create({orderUuid, potatoId, cheeseId, gravyId});
    }

}
