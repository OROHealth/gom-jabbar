import { Request, Response, Router } from 'express';
import CustomersController from '../controllers/customers';

const router = Router();

/* GET COUNT*/
router.get('/count', async (req: Request, res: Response) => {
	try {
		const count = await CustomersController.count();
		return res.status(200).send(String(count));
	} catch (_err) {
		res.sendStatus(500);
	}
});

export default router;
