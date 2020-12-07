import { nordoController } from '@controllers/nordo';
import { outremonaController } from '@controllers/outremona';
import { RobotName } from '@shared/core';
import { Router } from 'express';

export function robotControllerInitializer(robotName: RobotName): Router {
    switch (robotName) {
        case 'nordo': {
            return nordoController;
        }
        case 'outremona': {
            return outremonaController;
        }
        default: {
            break;
        }
    }
}
