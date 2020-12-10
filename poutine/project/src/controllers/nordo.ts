import { ParsedQueryRequest } from '@models/requests';
import { Potatoe } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const nordoController = router;

/**
 * This function boils potatoes
 * @param potatoes The potatoes to boil
 * @returns Boiled potatoes
 */
export function boilPotatoes(potatoes: Potatoe[]): Potatoe[] {
    potatoes.forEach((potatoe) => {
        potatoe.boiled = true;
    });

    return potatoes;
}

router.post('/potatoes/boil', (req: ParsedQueryRequest, res): any => {
    const potatoes = req.body;

    console.log(`Boil potatoes`);

    res.json(boilPotatoes(potatoes));
});
