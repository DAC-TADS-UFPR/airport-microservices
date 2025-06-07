import { Request, Response, NextFunction } from 'express';

export function reservationStateDecorator(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.estado === "CHECK-IN") {
        req.body.estado = "CHECK_IN";
    }
    next();
}