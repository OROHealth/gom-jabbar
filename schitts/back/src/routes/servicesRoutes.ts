import { Request, Response, Router } from 'express';
import resetDB from '../services/resetDB';

const router = Router();

/* GET ALL*/
router.get('/reset', async (req: Request, res: Response) => {
		const reset = await resetDB();
		if(reset) return res.status(200).send();
		return res.status(500).send();
});

/* UPDATE USER */
// router.patch('/:carrierId/enable', async (req: Request, res: Response) => {
// 	const { carrierId } = req.params;
// 	const { enable } = req.body;

// 	if (!carrierId) { return res.status(404).send('Carrier not found') };
// 	if (!enable) { return res.status(404).send('Erreur data') };
// 	try {
// 		const carrier = await CarriersController.setEnable(carrierId, enable);
// 		if(carrier) return res.status(200).send(carrier);
// 		return res.status(500).send();
// 	} catch (_err) {
// 		return res.status(500).send();
// 	}
// });

export default router;
