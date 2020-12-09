import { ParsedQueryRequest } from '@models/requests';
import { cuisineService } from '@services/cuisine.service';
import { Cheese, Potatoe, Sauce } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const chefController = router;

router.get('/poutine', (req: ParsedQueryRequest, res, next): any => {
    const { oil } = req.parsedQuery;

    const potatoesPreparation = cuisineService
        .cutPotatoes(1, 2)
        .then((cutPotatoes) => cuisineService.dipPotatoes(cutPotatoes, 25000))
        .then((dippedPotatoes) => cuisineService.boilPotatoes(dippedPotatoes))
        .then((boiledPotatoes) => cuisineService.fryPotatoes(boiledPotatoes, oil))
        .then((friedPotatoes) => Promise.all([cuisineService.fantasticLyrics(), friedPotatoes]))
        .then(([lyrics, preparedPotatoes]) => {
            console.log(`🎵 Le Chef is singing 🎙️:\n${lyrics.text}`);

            return preparedPotatoes;
        });

    return cuisineService
        .keepWarm({ type: 'gravy' }, 93)
        .then(() =>
            Promise.all([
                cuisineService.squeezeCheese(),
                cuisineService.potContent(),
                potatoesPreparation,
            ]).then(([cheese, sauce, potatoes]: [Cheese, Sauce, Potatoe[]]) => res.json({ cheese, sauce, potatoes }))
        )
        .catch((err) => next(err));
});
