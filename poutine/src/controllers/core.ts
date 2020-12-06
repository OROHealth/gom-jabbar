import { Router } from 'express';

const router = Router();
export const coreController = router;

router.get('/check', (req, res): any => res.json({ ok: true }));
