import express, { ErrorRequestHandler } from 'express';
import cors from "cors";
import helmet from "helmet";
import { IConfig } from "./config";

//ROUTES
import servicesRoutes from './routes/servicesRoutes';
import customersRoutes from './routes/customersRoutes';
import ordersRoutes from './routes/ordersRoutes';

function createExpressApp(config: IConfig): express.Express {
	const { express_debug } = config;

	const app = express();

	app.use(cors());

	app.use(((err, _req, res, _next) => {
		console.error(err.stack);
		res.status(500).send(!express_debug ? 'Oups' : err);
	}) as ErrorRequestHandler);

	app.use(helmet());
	app.use(express.json());

	app.use('/services', servicesRoutes);
	app.use('/customers', customersRoutes);
	app.use('/orders', ordersRoutes);
	app.get("/test", async (req, res) => {
		res.json({ message: "pass!" });
	});

	return app;
}

export default createExpressApp;
