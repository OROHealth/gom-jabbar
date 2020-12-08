import { ParsedQueryRequest } from '@models/requests';
import boom from '@hapi/boom';
import { Cardboard } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const pierreController = router;

function mix(content: any): Cardboard {
    if (!content || Object.keys(content).length === 0) {
        throw boom.badRequest('Nothing to mix');
    }

    return { ...content, mixed: true };
}

router.post('/mix', (req: ParsedQueryRequest, res): any => {
    const content = req.body;

    console.log('Mixing:', content);

    res.json(mix(content));
});
