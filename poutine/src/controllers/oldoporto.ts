import { Router } from 'express';

const router = Router();
export const oldoportoController = router;

router.get('/keep-warm', (req, res): any => res.json({}));
