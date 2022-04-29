import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private keyCloakService: KeycloakService, public http: HttpClient) {}

    userRole: string | undefined;

    setUserRole(roles: string[]): void {
        if (roles.includes('admin_user')) this.userRole = 'admin';
        else this.userRole = 'user';
    }

    logout(): Observable<boolean> {
        this.keyCloakService.logout();
        return of(true);
    }

    addUserToDatabase(user: User): Observable<User> {
        return this.http.post<User>(environment.apiBaseUrl + 'users/addUser', user).pipe(
            map(data => {
                console.log(data);
                return User.parse(data);
            })
        );
    }
}
