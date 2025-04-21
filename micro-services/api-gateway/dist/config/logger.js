import winston from "winston";
import path from "path";
const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    return `${timestamp} [${level}] ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ""}`;
});
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, "../../logs/api-gateway.log"),
        }),
    ],
});
export const logApiRequest = (req) => {
    logger.info(`Request: ${req.body} ${req.path}`, {
        body: req.body,
        query: req.query,
        params: req.params,
    });
};
export const logApiResponse = (res, data) => {
    logger.info(`Response: ${res.statusCode}`, { data });
};
export const logApiError = (error) => {
    logger.error("API Error", { error });
};
export default logger;
