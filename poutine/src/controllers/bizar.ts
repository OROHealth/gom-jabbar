import boom from '@hapi/boom';
import { ParsedQueryRequest } from '@models/requests';
import { Potatoe } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const bizarController = router;

const { FRYING_OILS = '' } = process.env;
const fryingOilList = FRYING_OILS.split(',').filter((value) => value !== '');

function fryPotatoes(potatoes: Potatoe[], oil: string, availableOils: string[]): Potatoe[] {
    if (!availableOils.includes(oil)) {
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
