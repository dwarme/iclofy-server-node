import App, { ObjectErrorType } from "../types/error";

export class AppError extends Error {
    constructor(raw: App.AppRawError) {
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
        rawAppError: App.AppRawError & { type: App.RawErrorType }
    ): AppError;

    static generate(rawAppError: App.AppRawError) {
        switch (rawAppError.type) {
            case 'invalid_request_error':
                return new AppInvalidRequestError(rawAppError)
            case 'authentication_error':
                return new AppAuthenticationError(rawAppError)
            case 'api_error':
                return new AppAPIError(rawAppError)
            case 'jwt_error':
                return new AppJwtError(rawAppError)
            case 'cookie_error':
                return new AppCookieError(rawAppError)
            case 'user_error':
                return new AppUserError(rawAppError)
            case 'payment_error':
                return new AppPaymentError(rawAppError)

            default:
                return new AppUnknownError(rawAppError)
        }
    }

    /**
     * A human-readable message message giving more details about the error.
    */
    readonly message: string;

    readonly type: ObjectErrorType;

    readonly rawType: App.RawErrorType;

    readonly code?: App.AppErrorCode;

    readonly detail?: string;

    /**
     * Typically a 4xx or 5xx.
    **/
    readonly statusCode?: number;

    readonly raw: unknown;

    readonly object: string = 'app_error'
    
}
// Specific App Error types:
/** 
 * An invalid request errors arise when your request has invalid parameters.
*/
export class AppInvalidRequestError extends AppError { }

/**
 * Failure to properly authenticate user/customer in the request.
*/
export class AppAuthenticationError extends AppError { }

/**
 * Access was attempted on a resource that wasn't allowed.
*/
export class AppPermissionError extends AppError { }

/**
 * API errors cover any other type of problem (e.g., a temporary problem with the App servers),
 * and are ex  tremely uncommon.
*/
export class AppAPIError extends AppError { }

export class AppJwtError extends AppError {}

export class AppCookieError extends AppError {}

export class AppUserError extends AppError {}

export class AppPaymentError extends AppError {}

/**
 * Any other error from App not specifically captured above
 */
export class AppUnknownError extends AppError { }
