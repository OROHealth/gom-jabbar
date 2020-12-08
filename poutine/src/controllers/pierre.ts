import { Router } from 'express';

const router = Router();
export const pierreController = router;

router.get('/mix', (req, res): any => res.json({}));
