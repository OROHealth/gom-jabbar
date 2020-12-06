import { Request, Response, NextFunction } from 'express';
import Boom from 'boom';

export function developmentErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction): any {
    if (res.headersSent) {
        return next(err);
    }

    const { statusCode, payload } = err.output;

    return res.status(statusCode).json({ ...payload, stack: err.stack });
}

export function productionErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction): any {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    const { statusCode, payload } = err.output;

    return res.status(statusCode).json({ payload });
}

export const errorHandler = process.env.NODE_ENV === 'development' ? developmentErrorHandler : productionErrorHandler;
