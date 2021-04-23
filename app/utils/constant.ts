/**
 * Declares constants to be used throughout the app.
 * Includes:
 *   1. Root API endpoint
 *   2. Request headers
 *   3. Route Name Extractor
 *   4. Screen View Analytics Tracker
 *   5. Custom crash reporter
 * @packageDocumentation
 */

// import { trackScreenView, trackCrashEvent } from './analytics';

import { headers, baseURI } from './api';

// import { getCurrentRouteName } from './navigation';

import { request } from './fetch';
/**
 * constants to be exported
 */
const constants = {
    baseURI,
    headers,
    // getCurrentRouteName,
    // trackScreenView,
    // trackCrashEvent,
    request,
};

export default constants;
