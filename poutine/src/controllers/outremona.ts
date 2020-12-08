import { promiseTimeout } from '@services/utilities';
import { Cheese } from '@shared/core';
import { Router } from 'express';

const router = Router();
export const outremonaController = router;

function squeezeCheese(): Promise<Cheese> {
    return promiseTimeout(2000)
        .then(() => {
            console.log(
                "🧀 -> \"I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!\""
                    .yellow
            );
        })
        .then(() => {
            return {
                squeezed: true,
            };
        });
}

router.get('/cheeses/squeeze', (req, res): any => {
    console.log('Takes a handful of squeaky cheese and squeeze it...');

    squeezeCheese().then(() => {
        console.log('Cheese is squeezed!');

        res.json({ squeezed: true });
    });
});
