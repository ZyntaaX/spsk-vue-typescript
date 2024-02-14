import i18n from '@/i18n/i18n';

interface ErrorMessageMap {
    [key: string] : string;
}

const errorMessages: ErrorMessageMap = {
    "auth/invalid-credential": i18n.global.t('error_messages.auth_invalid_credentials'),
    "auth/custom-server-failed-authorization": i18n.global.t('error_messages.auth_server_failed_auth'),
    "auth/user-disabled": i18n.global.t('error_messages.auth_account_disabled'),
    "auth/email-not-verified": i18n.global.t('error_messages.auth_email_not_verified')
}

export function getAuthError(errorCode: string) : string {
    return errorMessages[errorCode] ?? i18n.global.t('error_messages.auth_generic_message');
}