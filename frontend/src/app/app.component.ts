import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { User } from './models/user.model';
import { UserService } from './services/user/user.service';
import { loginSuccess, logoutStart, setTheme } from './store/actions/user/user.actions';
import { themeData } from './store/reducers/user/user.selector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    roles: string[] | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string | undefined;
    email: string | undefined;
    token: string | undefined;
    id: string | undefined;
    theme: string | undefined;
    constructor(
    private keyCloakService: KeycloakService,
    public router: Router,
    private store: Store,
    private userService: UserService
    ) {}

    ngOnInit(): void {
        this.initializeUserOptions();
    }

    async initializeUserOptions(): Promise<void> {
        // this.roles = this.keyCloakService.getUserRoles();
        // this.userService.setUserRole(this.roles);
        // this.userName = this.keyCloakService.getUsername();
        // await this.keyCloakService.loadUserProfile().then(data => {
        //     this.setDetails(data.email, data.firstName, data.lastName, data.id);
        // });
        // await this.keyCloakService.getToken().then(data => {
        //     this.setToken(data);
        // });
        // this.dispatchUserDetails();
        this.store.select(themeData).subscribe(data => {
            this.theme = data;
            document.documentElement.setAttribute('data-theme', this.theme);
            console.log(this.theme);
        });
    }

    setDetails(email?: string, firstName?: string, lastName?: string, id?: string): void {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        console.log('id=', this.id);
    }
    setToken(token?: string): void {
        console.log(token);
        this.token = token;
    }

    dispatchUserDetails(): void {
        if (this.firstName && this.lastName && this.id && this.email && this.userName) {
            const user: User = {
                firstName: this.firstName,
                lastName: this.lastName,
                emailAddress: this.email,
                userName: this.userName,
                keycloakUserId: this.id,
            };
            this.store.dispatch(loginSuccess({ user }));
        }
    }

    logout(): void {
        this.store.dispatch(logoutStart());
    }

    themeChange(theme: string): void {
        this.store.dispatch(setTheme({ theme: theme }));
    }
}
