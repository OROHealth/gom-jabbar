import { Router } from 'express';

const router = Router();
export const nordoController = router;

router.get('/potatoes/boil', (req, res): any => res.json({ boiled: true }));
