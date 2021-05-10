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

import {headers, baseURI} from './api';

// import { getCurrentRouteName } from './navigation';

import {request} from './fetch';
/**
 * constants to be exported
 */
const USER_TOKEN = 'bookARUserToken';
const RESTORE_TOKEN = 'RESTORE_TOKEN';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SET_BOOKS = 'SET_BOOKS';
const BOOK_LIST = 'bookList';
const DARK_COLOR = '#1c313a';
const WHITE = '#ffffff';
const HDR_KEY = 'book_ar_hdr_state';
const AF_KEY = 'book_ar_af_state';
const constants = {
  baseURI,
  headers,
  // getCurrentRouteName,
  // trackScreenView,
  // trackCrashEvent,
  request,
  USER_TOKEN,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SET_BOOKS,
  BOOK_LIST,
  WHITE,
  DARK_COLOR,
  HDR_KEY,
  AF_KEY,
};

export default constants;
