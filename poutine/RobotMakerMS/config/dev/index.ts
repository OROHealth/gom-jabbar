export default {
    switches : {
        new_relic : false,
        pug : false,
    },
    databases: {
        mongo: {
            enable: true,
            host: "127.0.0.1",
            port: "27017",
            user_database: "robomaker",
            user_collection: "users",
            cheese_collection: "cheese",
            potatoe_collection: "potato",
            gravy_collection: "gravy",
            cardBoax_collection: "cardBoax"
        },
        redis: {
            enable: true,
            host: "127.0.0.1",
            port: "6379",
            user_database: 3,
        }
    },

};
