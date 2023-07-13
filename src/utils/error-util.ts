import { GraphQLError } from "graphql";
import { AppError, AppUnknownError } from "../models/AppError";

export const graphQLError = (message: string, options?: { [attributeName: string]: any; }, appError?: AppError) => {
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
    new AppUnknownError({
        type: 'internal_error',
        code: 'unknown',
        message: "An error occured",
        statusCode: 500,
    })
)