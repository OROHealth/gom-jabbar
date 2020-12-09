import { ParsedQueryRequest } from '@models/requests';
import { promiseTimeout } from '@services/utilities';
import { Potatoe } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const verdunyController = router;

/**
 * This functions get potatoes out of Wonderland and cut it in cubes.
 * @param sideLength The length of a side of the cube
 * @param potatoeNumber The number of potatoes to cut
 * @returns Cut potatoes
 */
export function cutPotatoes(sideLength: number, potatoeNumber: number): any[] {
    const res = [];

    for (let idx = 0; idx < potatoeNumber; idx++) {
        res.push({ sideLength, cut: true });
    }

    return res;
}

/**
 * This function dip Potatoes in maple syrup
 * @param potatoes The potatoes to dip
 * @param duration The dipping duration
 * @returns Dipped potatoes
 */
export function dipPotatoes(potatoes: Potatoe[], duration: number): Promise<Potatoe[]> {
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
