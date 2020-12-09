import { Request, Response, Router } from 'express';
import resetDB from '../services/resetDB';

const router = Router();

/* RESET DATABASE*/
router.get('/reset', async (req: Request, res: Response) => {
		const reset = await resetDB();
		if(reset) return res.status(200).send();
		return res.status(500).send();
});

/* INSERTION */
router.get('/reset', async (req: Request, res: Response) => {
	const reset = await resetDB();
	if(reset) return res.status(200).send();
	return res.status(500).send();
});

export default router;
