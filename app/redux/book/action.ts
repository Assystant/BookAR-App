import { SET_LOGIN_TOKEN} from './type';

/**
 *  to user can perform operation like set/ send  the company detail to the store.
 * @param company
 */
export const setToken = token => ({
    type: SET_LOGIN_TOKEN,
    payload: token,
});
