import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { userTestData } from 'src/app/testData/user';
import { reducers } from '..';
import {
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    SET_THEME,
} from '../../actions/user/user.actions';
import { initialState } from '../../state/user/user.state';
import { userReducer } from './user.reducer';

describe('User : Reducers', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(reducers)],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
    });

    it('should set user when loginSuccess action is triggered', async () => {
        const action = { user: userTestData, type: LOGIN_SUCCESS };
        expect(userReducer(initialState, action)).toEqual({ ...initialState, user: action.user });
    });

    it('should set user to null when logoutSuccess action is triggered', async () => {
        const action = {
            type: LOGOUT_SUCCESS,
        };
        expect(userReducer(initialState, action)).toEqual({ ...initialState, user: null });
    });

    it('should set state when logoutFailure action is triggered', async () => {
        const action = {
            type: LOGOUT_FAILURE,
        };
        expect(userReducer(initialState, action)).toEqual({ ...initialState });
    });

    it('should set theme when setTheme action is triggered', async () => {
        const action = { theme: 'dark', type: SET_THEME };
        expect(userReducer(initialState, action)).toEqual({ ...initialState, theme: action.theme });
    });
});
