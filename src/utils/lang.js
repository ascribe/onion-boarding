import { formatText } from 'ascribe-react-components/modules/utils/general';


/**
 * FIXME: Add translations to this as necessary; for now it just returns the string
 */
export function getLangText(string, ...args) {
    return formatText(string, ...args);
}
