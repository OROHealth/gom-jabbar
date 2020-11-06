import * as express from "express";
import * as tyboost from "tyboost";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as listEndpoints from "express-list-endpoints";
import * as Table from "cli-table";

import servicesInitializer from "./service_initializers";
import allRouter from "../routes";
import allInitializer from "./initializers";
import  { logger, constants, config } from "../utils";

// initialise express app with tyboost - https://www.npmjs.com/package/tyboost
logger.info(`BOOT :: App is starting with environment :: ${constants.ENV}`);
logger.info(`BOOT :: Initialising express app with tyboost`);
const app = tyboost(express());

// register application level middleware
const registerCoreMiddleware = function (): void {
    try {
        logger.info(`BOOT :: Registering core middleware started`);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        logger.info(`BOOT :: Registered middleware : bodyParser`);

        app.use(cors());
        app.options("*", cors());
        logger.info(`BOOT :: Registered middleware : cors(*)`);

        // Enable in case of the pug switch is on
        if (config.switches && config.switches.pug) {
            // you can change pug views folder path here
            // app.set("views", path.join(`${__dirname}`, "views"));
            app.set("view engine", "pug");
            logger.info(`BOOT :: Registered middleware : pug`);
        }

        logger.info(`BOOT :: Registering core middleware done`);
    } catch (err) {
        logger.error(`BOOT :: Error while registering core middleware . Check core middleware : ${JSON.stringify(err.message)}`);
    }
};

// register all routes in routes/index
const registerRoutes =  (routers: object): void  => {
    try {
        if (Object.keys(routers) && Object.keys(routers).length) {
            logger.info(`BOOT :: Registering routes started`);
            Object.keys(routers).forEach(key => {
                app.use("/", routers[key]);
            });
            // print the routes in console
            logger.info(`BOOT :: Registered following routes`);
            const table = new Table({ head: ["", "Path"] });
            listEndpoints(app).forEach(route => {
                if (route.path != "*") {
                    const row = {};
                    row[`${route.methods.join(", ")}`] = route.path;
                    table.push(row);
                }
            });
            logger.info(`\n${table.toString()}`);
            logger.info("BOOT :: Registering routes done");
        }
    } catch (err) {
        logger.error(`BOOT :: Error while registering routes. Check routes : ${JSON.stringify(err.message)}`);
    }
};

// register all initializer in initializers/index
const registerInitializers = (initializers: object): void  => {
    try {
        logger.info(`BOOT :: Registering initializer started`);

        Object.keys(initializers).forEach(key => {
            app.register(allInitializer[key]);
            logger.info(`BOOT :: Registered initializer : ${key}`);
        });
        logger.info(`BOOT :: Registering initializer done`);
    } catch (err) {
        logger.error(`BOOT :: Error while registering initializer. Check initializer : ${JSON.stringify(err.message)}`);
    }
};

const handleError  = (): void => {
    process.on("uncaughtException", function (err) {
        logger.error(`UNCAUGHT_EXCEPTION OCCURRED : ${JSON.stringify(err.stack)}`);
        process.exit(1);
    });
};

// start application
const startApp  = async (): Promise<void> => {
    try {
        // register core application level middleware
        registerCoreMiddleware();
        // register routes
        registerRoutes(allRouter ? allRouter : {});
        // register all the initializer

        registerInitializers(allInitializer ? allInitializer : {});
        logger.info(`BOOT :: Booting application started`);
        await app.boot();
        logger.info(`BOOT :: Booting application done`);

        await servicesInitializer._services();

        app.listen(constants.PORT, constants.HOST) .on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    logger.error(`BOOT :: ${constants.HOST}:${constants.PORT} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    logger.error(`BOOT :: ${constants.HOST}:${constants.PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        })
            .on("listening", () => {
                logger.info(`BOOT :: <> <> <> <> <> <> <> <> <> <> Listening on ${constants.HOST}:${constants.PORT} <> <> <> <> <> <> <> <> <> <>`);
            });

        // exit on uncaught exception
        handleError();

        return app;
    } catch (err) {
        logger.error(`BOOT :: Error while booting application from boot script : ${JSON.stringify(err)}`);
        throw err;
    }
};

export default startApp;
