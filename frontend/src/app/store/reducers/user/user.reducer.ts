import { createReducer, on } from '@ngrx/store';
import {
    loginSuccess,
    logoutFailure,
    logoutSuccess,
    setTheme,
    setWalletAddressSuccess,
} from '../../actions/user/user.actions';

import { initialState, UserState } from '../../state/user/user.state';

export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
        };
    }),
    on(logoutSuccess, state => {
        return {
            ...state,
            user: null,
        };
    }),
    on(logoutFailure, state => {
        return {
            ...state,
        };
    }),
    on(setTheme, (state, action) => {
        return {
            ...state,
            theme: action.theme,
        };
    }),

    on(setWalletAddressSuccess, (state, action) => {
        return {
            ...state,
            walletAddress: action.address,
        };
    })


);

export const getUser = (state: UserState) => state.user;
export const getTheme = (state: UserState) => state.theme;
