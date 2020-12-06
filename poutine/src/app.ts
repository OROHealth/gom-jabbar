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

const { API_PREFIX = '' } = process.env;

const application = express();
application.disable('x-powered-by');
applyRequestMiddleWares(application, API_PREFIX);
applyRoutes(application, API_PREFIX);
applyResponseMiddleWares(application);
export default application;

/**
 * Apply the request middlewares to the specified express application
 * @param app the express application
 * @param prefix the api url prefix
 */
function applyRequestMiddleWares(app: Application, prefix: string): void {
    const swaggerDocumentPath = path.join(__dirname, '../swagger.yaml');
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
export function applyRoutes(app: Application, prefix: string): void {
    app.use(prefix, controllers.coreController);

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
