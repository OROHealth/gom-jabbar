import { Router } from 'express';

const router = Router();
export const bizarController = router;

router.get('/potatoes/fry', (req, res): any => res.json({}));
