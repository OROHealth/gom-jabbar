import { Router } from 'express';

const router = Router();
export const verdunyController = router;

router.get('/potatoes/cut', (req, res): any => res.json({}));
router.get('/potatoes/dip', (req, res): any => res.json({}));
