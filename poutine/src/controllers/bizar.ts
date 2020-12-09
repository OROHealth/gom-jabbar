import boom from '@hapi/boom';
import { ParsedQueryRequest } from '@models/requests';
import { splitEnvVarArray } from '@services/utilities';
import { Potatoe } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const bizarController = router;

const { FRYING_OILS = '' } = process.env;
const fryingOilList = splitEnvVarArray(FRYING_OILS);

/**
 * This function fries potatoes in oil
 * @param potatoes The potatoes to fry
 * @param oil The needed oil
 * @param availableOils The available oils
 * @returns Fried potatoes
 * @throws boom.Boom when oil is not available
 */
export function fryPotatoes(potatoes: Potatoe[], oil: string, availableOils: string[]): Potatoe[] {
    if (!(availableOils && availableOils.includes(oil))) {
        throw boom.notFound(`'${oil}' oil not found`);
    }

    potatoes.forEach((potatoe) => {
        potatoe.fried = true;
        potatoe.oil = oil;
    });

    return potatoes;
}

router.post('/potatoes/fry', (req: ParsedQueryRequest, res): any => {
    const { oil } = req.parsedQuery;
    const potatoes = req.body;

    console.log(`Fry potatoes in '${oil}' oil`, fryingOilList);

    res.json(fryPotatoes(potatoes, oil, fryingOilList));
});
