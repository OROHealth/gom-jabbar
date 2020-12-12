import { Request, Response, Router } from 'express';
import OrdersController from '../controllers/orders';

const router = Router();

/* GET COUNT*/
router.get('/count', async (req: Request, res: Response) => {
	try {
		const count = await OrdersController.count();
		return res.status(200).send(String(count));
	} catch (_err) {
		res.sendStatus(500);
	}
});

export default router;
