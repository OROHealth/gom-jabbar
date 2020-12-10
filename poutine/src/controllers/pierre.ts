import { ParsedQueryRequest } from '@models/requests';
import boom from '@hapi/boom';
import { Cardbox } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const pierreController = router;

/**
 * This functions mixes any non-empty Object
 * @param content The content to mix
 * @returns A new mixed Object into a Cardbox
 */
export function mix(content: Record<string, any>): Cardbox {
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
