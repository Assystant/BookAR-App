import { SET_LOGIN_TOKEN, SET_USER_TOKEN } from './type';
/**
 * store the value related to the company in the state of the company reducer.
 */
const initialState = { token:'' };
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_TOKEN:
            return {
                ...state,
                routes: action.payload,
            };
            case SET_USER_TOKEN:
                return {
                    ...state,
                    token: action.payload,
                };
        default:
            return { ...state };
    }
};

export { authReducer };
