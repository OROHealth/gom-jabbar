import { Router } from 'express';

const router = Router();
export const montroyashiController = router;

router.get('/fantastic-lyrics', (req, res): any => res.json({ lyrics: 'Lalala', artist: 'Leonard Cohen' }));
router.get('/peoples/analyze', (req, res): any => res.json({ drunk: true }));
