export type ObjectErrorType =
    | 'IClofyError'
    | 'IclofyInvalidRequestError'
    | 'IclofyAuthenticationError'
    | 'IclofyAPIError'
    | 'IclofyJwtError'
    | 'IclofyCookieError'
    | 'IclofyUserError'
    | 'IclofyPostError'
    | 'IclofyPaymentError'

export type RawErrorType =
    | 'invalid_request_error'
    | 'authentication_error'
    | 'permission_error'
    | 'internal_error'
    | 'api_error'
    | 'user_error'
    | 'post_error'
    | 'payment_error'
    | 'jwt_error'
    | 'cookie_error'

export type IClofyRawError = {
    message?: string;
    type: RawErrorType;
    statusCode?: number;
    code?: IClofyErrorCode;
    detail?: string;
    invalideFields?: string[];
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

export type IClofyErrorCode =
    & CustomerInputErrorCode
    | 'permission_required'
    | 'authentication_required'
    | 'password_incorrect'
    | 'already_connected'
    | 'user_not_found'
    | 'user_already_exists'
    | 'post_not_found'
    | 'post_already_exists'
    | 'payment_balance_insufficient'
    | 'payment_transaction_invalid_amount'
    | 'token_not_found'
    | 'cookie_token_required'
    | 'cookie_token_expired'
    | 'unknown'

export type APIClientRequestErrorData = {
    type: ObjectErrorType;
    code?: IClofyErrorCode;
    detail?: string;
    statusCode?: number;
    message?: string;
}