import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess,
    saveUserDataFailure,
    saveUserDataSuccess,
} from '../../actions/user/user.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Injectable()
export class UserEffects {
    constructor(
    private action$: Actions,
    private userService: UserService,
    public router: Router,
    private snackService: SnackbarService
    ) {}

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginSuccess),
            exhaustMap(action => {
                return this.userService.addUserToDatabase(action.user).pipe(
                    map(() => {
                        return saveUserDataSuccess({ user: action.user });
                    }),
                    catchError(error => {
                        this.snackService.showMessage(error.name + ' : ' + error.message);
                        return of(saveUserDataFailure());
                    })
                );
            })
        );
    });
    logout$ = createEffect(() => {
        return this.action$.pipe(
            ofType(logoutStart),
            exhaustMap(() => {
                return this.userService.logout().pipe(
                    map(() => {
                        this.router.navigateByUrl('/home');
                        return logoutSuccess();
                    }),
                    catchError(error => {
                        this.snackService.showMessage(error.name + ' : ' + error.message);
                        return of(logoutFailure());
                    })
                );
            })
        );
    });
}
