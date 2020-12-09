import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function boomify(err: any, req: Request, res: Response, next: NextFunction): any {
    if (err.isBoom) {
        return next(err);
    }

    return next(boom.boomify(err));
}
