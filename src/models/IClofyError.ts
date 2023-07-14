import IClofy, { ObjectErrorType } from "../types/error";

export class IClofyError extends Error {
    constructor(raw: IClofy.IClofyRawError) {
        super(raw.message)
        this.raw = raw;
        this.type = this.constructor.name as any;
        this.rawType = raw.type;
        this.message = raw.message ?? '';
        this.code = raw.code;
        this.detail = raw.detail;
        this.statusCode = raw.statusCode;
    }

    static generate(
        rawIClofyError: IClofy.IClofyRawError & { type: IClofy.RawErrorType }
    ): IClofyError;

    static generate(rawIClofyError: IClofy.IClofyRawError) {
        switch (rawIClofyError.type) {
            case 'invalid_request_error':
                return new IClofyInvalidRequestError(rawIClofyError)
            case 'authentication_error':
                return new IClofyAuthenticationError(rawIClofyError)
            case 'api_error':
                return new IClofyAPIError(rawIClofyError)
            case 'jwt_error':
                return new IClofyJwtError(rawIClofyError)
            case 'cookie_error':
                return new IClofyCookieError(rawIClofyError)
            case 'user_error':
                return new IClofyUserError(rawIClofyError)

            default:
                return new IClofyUnknownError(rawIClofyError)
        }
    }

    /**
     * A human-readable message message giving more details about the error.
    */
    readonly message: string;

    readonly type: ObjectErrorType;

    readonly rawType: IClofy.RawErrorType;

    readonly code?: IClofy.IClofyErrorCode;

    readonly detail?: string;

    /**
     * Typically a 4xx or 5xx.
    **/
    readonly statusCode?: number;

    readonly raw: unknown;

    readonly object: string = 'iclofy_error'
    
}
// Specific IClofy Error types:
/** 
 * An invalid request errors arise when your request has invalid parameters.
*/
export class IClofyInvalidRequestError extends IClofyError { }

/**
 * Failure to properly authenticate user/customer in the request.
*/
export class IClofyAuthenticationError extends IClofyError { }

/**
 * Access was attempted on a resource that wasn't allowed.
*/
export class IClofyPermissionError extends IClofyError { }

/**
 * API errors cover any other type of problem (e.g., a temporary problem with the IClofy servers),
 * and are ex  tremely uncommon.
*/
export class IClofyAPIError extends IClofyError { }

export class IClofyJwtError extends IClofyError {}

export class IClofyCookieError extends IClofyError {}

export class IClofyUserError extends IClofyError {}

/**
 * Any other error from IClofy not specifically captured above
 */
export class IClofyUnknownError extends IClofyError { }
