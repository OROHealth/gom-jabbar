import 'colors';
import path from 'path';
import fs from 'fs';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import queryParams from 'express-query-params';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import * as controllers from '@controllers';
import { boomify, errorHandler } from '@middlewares';
import { RobotName } from '@shared/core';
import { robotControllerInitializer } from '@services/controller-initializer';

const { API_PREFIX = '', ROBOT_NAME = '' } = process.env;

const application = express();
application.disable('x-powered-by');
applyRequestMiddleWares(application, API_PREFIX, ROBOT_NAME);
applyRoutes(application, API_PREFIX, ROBOT_NAME as RobotName);
applyResponseMiddleWares(application);
export default application;

/**
 * Apply the request middlewares to the specified express application
 * @param app the express application
 * @param prefix the api url prefix
 */
function applyRequestMiddleWares(app: Application, prefix: string, swaggerName: string): void {
    const swaggerDocumentPath = path.join(__dirname, `../swagger/${swaggerName}.yaml`);
    if (process.env.NODE_ENV === 'development' && fs.existsSync(swaggerDocumentPath)) {
        const swaggerDocument = yaml.load(swaggerDocumentPath);
        const options = {
            swaggerOptions: {
                filter: true,
                validatorUrl: null,
            },
        };
        app.use(prefix + '/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(queryParams({ blacklistParams: ['limit', 'page', 'select', 'sort'] }));
}

/**
 * Apply the routes to the specified express application
 * @param app the express application
 * @param prefix the api url prefix
 */
export function applyRoutes(app: Application, prefix: string, robotName: RobotName): void {
    app.use(prefix, controllers.coreController);

    const robotController = robotControllerInitializer(robotName);
    if (robotController) {
        console.log(`Initializing '${robotName}' robot maker`.grey);
        app.use(prefix, robotController);
    } else {
        // TODO: Do something when no robot controller defined ?
        console.log(`🚨 Robot ${robotName} not found`.red);
    }

    // The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', (req, res): any => res.status(404).send('Not Found ¯\\_(ツ)_/¯'));
}

/**
 * Apply the response middlewares to the specified express application
 * @param app the express application
 */
function applyResponseMiddleWares(app: Application): void {
    app.use(boomify);
    app.use(errorHandler);
}
