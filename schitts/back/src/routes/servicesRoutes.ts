import { Request, Response, Router } from 'express';
import resetDB from '../services/resetDB';
import insertion from '../services/insertion';

const router = Router();

/* RESET DATABASE*/
router.get('/reset', async (req: Request, res: Response) => {
	const reset = await resetDB();
	if (reset) return res.status(200).send();
	return res.status(500).send();
});

/* INSERTION */
router.get('/insertion', async (req: Request, res: Response) => {
	const { orderMin, orderMax, spanYears } = req.query;

	const props = {
		orderMin: parseInt(orderMin as string),
		orderMax: parseInt(orderMax as string),
		spanYears: parseInt(spanYears as string),
	}

	const result = await insertion(props);

	if(result) return res.status(200).send(result);
	return res.status(500).send();
});

export default router;
