//FIXME: this should just import from a common utils library
export function getCookie(name) {
    let parts = document.cookie.split(';');

    for(let i = 0; i < parts.length; i++) {
        if(parts[i].indexOf(name + '=') > -1) {
            return parts[i].split('=').pop();
        }
    }
}
