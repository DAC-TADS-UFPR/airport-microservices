import { Request, Response, NextFunction } from 'express';

export function reservationResponseDecorator(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function(data) {
        if (data && data.estado === "CHECK_IN") {
            data.estado = "CHECK-IN";
        }else if (data && data.estado === "CANCELADA_VOO") {
            data.estado = "CANCELADA VOO";
        }else if (data && data.estado === "NAO_REALIZADA") {
            data.estado = "NÃO REALIZADA";
        }
        return originalJson.call(this, data);
    }
    next();
}