import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN_SUCCESS = '[USER] LOGIN SUCCESS';
export const SAVE_USER_DATA_SUCCESS = '[USER] SAVE_USER_DATA_ SUCCESS';
export const SAVE_USER_DATA__FAILURE = '[USER] SAVE_USER_DATA_ FAILURE';

export const LOGOUT_START = '[USER] LOGOUT START';
export const LOGOUT_SUCCESS = '[USER] LOGOUT SUCCESS';
export const LOGOUT_FAILURE = '[USER] LOGOUT FAILURE';

export const SET_WALLET_ADDRESS_SUCCESS = '[USER] SET_WALLET_ADDRESS SUCCESS';

export const SET_THEME = '[USER] THEME CHANGE SUCCESS';

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
export const saveUserDataSuccess = createAction(SAVE_USER_DATA_SUCCESS, props<{ user: User }>());
export const saveUserDataFailure = createAction(SAVE_USER_DATA__FAILURE);

export const logoutStart = createAction(LOGOUT_START);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const setWalletAddressSuccess = createAction(SET_WALLET_ADDRESS_SUCCESS, props<{ address: string }>());

export const setTheme = createAction(SET_THEME, props<{ theme: string }>());
