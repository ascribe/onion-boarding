import { getCookie } from 'js-utility-belt/es6/cookie';

import { CSRF_COOKIE_NAME, CSRF_CUSTOM_HEADER_NAME } from '../constants/csrf_constants';


export function getCsrfToken() {
    return getCookie(CSRF_COOKIE_NAME);
}

export function makeCsrfHeader(csrfToken) {
    return {
        [CSRF_CUSTOM_HEADER_NAME]: csrfToken
    };
}
