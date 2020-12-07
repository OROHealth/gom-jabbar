import { Router } from 'express';

const router = Router();
export const outremonaController = router;

router.get('/cheeses/squeeze', (req, res): any => res.json({ squeezed: true }));
