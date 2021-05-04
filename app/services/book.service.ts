/**
 * API services working against the `org` endpoint.
 * @packageDocumentation
 */
import constants from '../utils/constant';

const fetch = constants.request;

/**
 * Retrieves the base uri for organization service.
 */
const baseURI = constants.baseURI('');
/**
 * API endpoint declarations related to organization service.
 */
const bookEndpoints = {
  token: constants.baseURI('/accounts/api-login/'),

  // token: constants.baseURI('/accounts/api-login'),
  // book: constants.baseURI('/book-api/book/?format=json'),
  book: `${baseURI}/book-api/book/`,
  bookDescription: (id: number) => `${baseURI}/book-api/book/${id}/phrases`,
  bookDetail: (id: number) => `${baseURI}/book-api/book/${id}/`,

  downloadBook: constants.baseURI('/book-api/book/'),
  downloadBooks: (id: string) => `${baseURI}/users/${id}/`,
};

/**
 * Endpoint used to authenticate a user against valid credentials.
 * Request Method: POST
 * @param formData Contains login credentials against fields retrieved from getProfileForm
 */
const authenticate = async (formData: object) => {
  console.log('FORM DATA', formData);
  return await fetch(bookEndpoints.token, {
    method: 'POST',
    headers: constants.headers(),
    body: JSON.stringify(formData),
  });
};
const getBookList = async (token: any) => {
  return await fetch(bookEndpoints.book, {
    method: 'GET',
    headers: constants.headers(token),
  });
};
const bookDetails = async (id: number, token: string) => {
  return await fetch(bookEndpoints.bookDetail(id), {
    method: 'GET',
    headers: constants.headers(token),
  });
};
const getBookDescription = async (id: number, token: any) => {
  return await fetch(bookEndpoints.bookDescription(id), {
    method: 'GET',
    headers: constants.headers(token),
  });
};

export {bookEndpoints, authenticate, getBookList, getBookDescription, bookDetails};
