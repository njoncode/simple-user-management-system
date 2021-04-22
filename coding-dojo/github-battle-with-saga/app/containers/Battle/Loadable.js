/**
 *
 * Asynchronously loads the component for Battle
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
