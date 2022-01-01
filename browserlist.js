/**
 * @file web3-browserslist-config
 * @version 0.1.3
 * @license Apache-2.0/MIT
 */

'use strict';

module.exports = {
  production: [
    '>0.3%',
    'not dead',
    'not op_mini all',
    'not IE > 0',
    'not samsung 4',
    'not and_uc 12.12',
  ],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 edge version',
  ],
};
/** @usage */
/**  ['>0.3%', 'not dead', 'not op_mini all', 'not IE > 0'];
npx browserslist ">0.3%, not dead, not op_mini all, not IE > 0"
and_chr 89
and_uc 12.12
chrome 88
chrome 87
chrome 86
edge 88
firefox 85
ios_saf 14.0-14.5
ios_saf 13.4-13.7
ios_saf 12.2-12.4
opera 73
safari 14
safari 13.1
samsung 13.0
*/
/** exports web3browserlist-config */
