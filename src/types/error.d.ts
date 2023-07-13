export type ObjectErrorType =
    | 'AppError'
    | 'AppInvalidRequestError'
    | 'AppAuthenticationError'
    | 'AppAPIError'
    | 'AppJwtError'
    | 'AppCookieError'
    | 'AppUserError'
    | 'AppPaymentError'

export type RawErrorType =
    | 'invalid_request_error'
    | 'authentication_error'
    | 'internal_error'
    | 'api_error'
    | 'user_error'
    | 'payment_error'
    | 'jwt_error'
    | 'cookie_error'

export type AppRawError = {
    message?: string;
    type: RawErrorType;
    statusCode?: number;
    code?: AppErrorCode;
    detail?: string;
}

type CustomerInputErrorCode =
    | 'BLANK'
    | 'INVALID'
    | 'TAKEN'
    | 'TOO_LONG'
    | 'TOO_SHORT'
    | 'UNIDENTIFIED_CUSTOMER'
    | 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
    | 'CONTAINS_HTML_TAGS'
    | 'CONTAINS_URL'
    | 'ADDRESS_NOT_FOUND'

export type AppErrorCode =
    & CustomerInputErrorCode
    | 'permission_required'
    | 'authentication_required'
    | 'password_incorrect'
    | 'already_connected'
    | 'user_not_found'
    | 'user_already_exists'
    | 'qrcode_already_exists'
    | 'payment_balance_insufficient'
    | 'payment_transaction_invalid_amount'
    | 'jwt_invalid'
    | 'jwt_token_required'
    | 'jwt_expired'
    | 'jwt_cookie_missing'
    | 'jwt_failed_to_create'
    | 'cookie_token_required'
    | 'cookie_token_expired'
    | 'unknown'

export type APIClientRequestErrorData = {
    type: ObjectErrorType;
    code?: AppErrorCode;
    detail?: string;
    statusCode?: number;
    message?: string;
}