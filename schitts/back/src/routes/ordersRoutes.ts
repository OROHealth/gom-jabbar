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

/* GET ORDERS WITH FEEDBACK > n */
router.get('/feedback', async (req: Request, res: Response) => {
	const { grade, months } = req.query;

	const list = await OrdersController.findByFeedback(parseInt(grade as string), parseInt(months as string));
	try {
		return res.status(200).send(list);
	} catch (_err) {
		res.sendStatus(500);
	}
	});

export default router;
