import { GraphQLError } from "graphql";
import { IClofyError, IClofyUnknownError } from "../models/IClofyError";
import winston from "winston";

export const graphQLError = (message: string, options?: { [attributeName: string]: any; }, appError?: IClofyError) => {
    const _ = undefined;
    if (appError) {
        options = {
            ...options,
            error: {
                type: appError.type,
                code: appError.code,
                statusCode: appError.statusCode,
                detail: appError.detail,
                message: appError.message ?? message,
                name: appError.name
            }
        }
    }

    return new GraphQLError('', null, null, null, null, null, options ?? {});
}

export const graphQLErrorUnknow = graphQLError(
    'An error occured',
    {},
    new IClofyUnknownError({
        type: 'internal_error',
        code: 'unknown',
        message: "An error occured",
        statusCode: 500,
    })
)

export const iclofyErrorLogger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});