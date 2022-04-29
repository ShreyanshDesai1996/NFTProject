import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../state/user/user.state';

export const userDetails = createFeatureSelector<UserState>('user');

export const userData = createSelector(userDetails, userData => {
    return userData.user;
});

export const themeData = createSelector(userDetails, userData => {
    return userData.theme;
});

export const addressData = createSelector(userDetails, userData => {
    return userData.walletAddress;
});
