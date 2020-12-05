import { configuration } from './config';
import { connect } from './database';
import createExpressApp from './server';

const config = configuration('Production');
const { PORT } = config;
const app = createExpressApp(config);

connect(config).then(
	() => {
		const server = app.listen(PORT, () => console.log(`Schitts API listening at ${PORT}`))
	}
);
