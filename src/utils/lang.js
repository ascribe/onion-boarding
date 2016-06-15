import { formatText } from 'js-utility-belt/es6/text';


/**
 * FIXME: Add translations to this as necessary; for now it just returns the string
 */
export function getLangText(string, ...args) {
    return formatText(string, ...args);
}
