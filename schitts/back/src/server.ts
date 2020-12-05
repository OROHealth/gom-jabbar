import express, { ErrorRequestHandler } from 'express';
import helmet from "helmet";
import { IConfig } from "./config";

//ROUTES
// import usersRoutes from './routes/usersRoutes';

function createExpressApp(config: IConfig): express.Express {
	const { express_debug } = config;

	const app = express();

	app.use(((err, _req, res, _next) => {
		console.error(err.stack);
		res.status(500).send(!express_debug ? 'Oups' : err);
	}) as ErrorRequestHandler);

	app.use(helmet());
	app.use(express.json());

	// app.use('/users', usersRoutes);
	app.get("/test", async (req, res) => {
		res.json({ message: "pass!" });
	});

	return app;
}

export default createExpressApp;
