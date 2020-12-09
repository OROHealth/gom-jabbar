import boom from '@hapi/boom';
import { ParsedQueryRequest } from '@models/requests';
import { Pot } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const oldoportoController = router;

let pot: Pot = { temperature: 0, content: undefined };

router.post('/keep-warm', (req: ParsedQueryRequest, res): any => {
    const { temperature } = req.parsedQuery;
    const content = req.body;

    pot = { temperature, content };

    console.log(`Keep in the pot at temperature ${temperature}:`, content);

    res.json({});
});

/**
 * This function returns the content of a Pot
 * @param pot The Pot to get the content from
 * @returns The content of the input Pot
 * @throws boom.Boom when Pot or its content is undefined
 */
export function getPotContent(pot: Pot): Pot {
    if (!(pot && pot.content)) {
        throw boom.badRequest('Pot is empty');
    }

    return pot.content;
}

router.get('/pot-content', (req: ParsedQueryRequest, res): any => {
    console.log(`Get some of the pot content`);

    res.json(getPotContent(pot));
});
