// FIXME: this should just import from a common utils library
// Or just use js-cookie?
export function getCookie(name) {
    const parts = document.cookie.split(';');

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(`${name}=`) > -1) {
            return parts[i].split('=').pop();
        }
    }

    return '';
}
