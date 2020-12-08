import { ParsedQueryRequest } from '@models/requests';
import { promiseTimeout } from '@services/utilities';
import { Potatoe } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const verdunyController = router;

function cutPotatoes(sideLength: number, potatoeNumber: number): any[] {
    const res = [];

    for (let idx = 0; idx < potatoeNumber; idx++) {
        res.push({ sideLength, cut: true });
    }

    return res;
}

function dipPotatoes(potatoes: Potatoe[], duration: number): Promise<Potatoe[]> {
    return promiseTimeout(duration).then(() => {
        potatoes.forEach((potatoe) => {
            potatoe.dipped = true;
            potatoe.dippingDuration = duration;
        });

        return potatoes;
    });
}

router.post('/potatoes/cut', (req: ParsedQueryRequest, res) => {
    const { sideLength, potatoeNumber } = req.parsedQuery;

    console.log(`Cut ${potatoeNumber} potatoes in ${sideLength}x${sideLength} inch cubes`);

    res.json(cutPotatoes(sideLength, potatoeNumber));
});

router.post('/potatoes/dip', (req: ParsedQueryRequest, res) => {
    const { duration } = req.parsedQuery;
    const potatoes = req.body;

    console.log(`Dip potatoes in maple sirup for ${duration} ms`);

    return dipPotatoes(potatoes, duration).then(() => res.json(potatoes));
});
