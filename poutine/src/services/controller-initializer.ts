import { bizarController } from '@controllers/bizar';
import { montroyashiController } from '@controllers/montroyashi';
import { nordoController } from '@controllers/nordo';
import { oldoportoController } from '@controllers/oldoporto';
import { outremonaController } from '@controllers/outremona';
import { pierreController } from '@controllers/pierre';
import { verdunyController } from '@controllers/verduny';
import { RobotName } from '@shared/core';
import { Router } from 'express';

export function robotControllerInitializer(robotName: RobotName): Router {
    switch (robotName) {
        case 'bizar': {
            return bizarController;
        }
        case 'montroyashi': {
            return montroyashiController;
        }
        case 'nordo': {
            return nordoController;
        }
        case 'oldoporto': {
            return oldoportoController;
        }
        case 'outremona': {
            return outremonaController;
        }
        case 'pierre': {
            return pierreController;
        }
        case 'verduny': {
            return verdunyController;
        }

        default: {
            break;
        }
    }
}
