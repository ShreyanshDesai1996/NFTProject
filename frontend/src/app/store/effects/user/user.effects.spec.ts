import { TestBed } from '@angular/core/testing';
import { Action, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MockService } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';
import { reducers } from '../../reducers';
import { initialState } from '../../state/user/user.state';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserEffects } from './user.effects';
import { UserService } from 'src/app/services/user/user.service';
import {
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    SAVE_USER_DATA_SUCCESS,
    SAVE_USER_DATA__FAILURE,
} from '../../actions/user/user.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { userTestData } from 'src/app/testData/user';

describe('User : Effects', () => {
    let actions$: Observable<Action>;
    let effects: UserEffects;
    let spy: jasmine.Spy;
    let snackbarSpy: jasmine.Spy;

    const mockUserService = MockService(UserService);
    const mockSnackbarService = MockService(SnackbarService);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],

            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers),
            ],
            providers: [
                UserEffects,
                { provide: UserService, useValue: mockUserService },
                { provide: SnackbarService, useValue: mockSnackbarService },

                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
            ],
        }).compileComponents();
        effects = TestBed.inject(UserEffects);
    });

    it('should call userService and dispatch saveUserDataSuccess action when the login call succeeds', async () => {
        actions$ = of({ type: LOGIN_SUCCESS, user: userTestData });
        spy = spyOn(mockUserService, 'addUserToDatabase');
        spy.and.returnValue(of(userTestData));
        effects.login$.subscribe(action => {
            expect(action).toEqual({ type: SAVE_USER_DATA_SUCCESS, user: userTestData });
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call snackbarService and dispatch saveUserDataFailure action when the login call fails', async () => {
        actions$ = of({ type: LOGIN_SUCCESS, user: userTestData });

        const expectedError = Error('foo-error');
        spy = spyOn(mockUserService, 'addUserToDatabase');
        snackbarSpy = spyOn(mockSnackbarService, 'showMessage');
        spy.and.callFake(() => throwError(expectedError));
        effects.login$.subscribe(action => {
            expect(action).toEqual({ type: SAVE_USER_DATA__FAILURE });
            expect(snackbarSpy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call userService and dispatch logoutSuccess action when the logout call succeeds', async () => {
        actions$ = of({ type: LOGOUT_START });
        spy = spyOn(mockUserService, 'logout');
        spy.and.returnValue(of(true));
        effects.logout$.subscribe(action => {
            expect(action).toEqual({ type: LOGOUT_SUCCESS });
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call snackbarService and dispatch logoutFailure action when the logout call fails', async () => {
        actions$ = of({ type: LOGOUT_START });

        const expectedError = Error('foo-error');
        spy = spyOn(mockUserService, 'logout');
        snackbarSpy = spyOn(mockSnackbarService, 'showMessage');
        spy.and.callFake(() => throwError(expectedError));
        effects.logout$.subscribe(action => {
            expect(action).toEqual({ type: LOGOUT_FAILURE });
            expect(snackbarSpy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
