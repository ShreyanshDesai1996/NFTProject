import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MockService } from 'ng-mocks';
import { MaterialModule } from 'src/app/material.module';
import { userTestData } from 'src/app/testData/user';
import { initializeKeycloak } from 'src/app/utils/app.init';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let httpTestingController: HttpTestingController;
    const mockKeycloakService = MockService(initializeKeycloak);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MaterialModule,
                KeycloakAngularModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: initializeKeycloak,
                    useValue: mockKeycloakService,
                },
            ],
        });
        service = TestBed.inject(UserService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should assign admin user role', () => {
        service.setUserRole(['admin_user']);
        expect(service.userRole).toEqual('admin');
    });

    it('should assign normal user role', () => {
        service.setUserRole(['normal_user']);
        expect(service.userRole).toEqual('user');
    });

    //   it(`should call keycloak service logout to end the user's session`, () => {
    //     const spy =spyOn(mockKeycloakService, 'logout');
    //     service.logout();
    //     expect(spy).toHaveBeenCalledTimes(1);

    // });

    it('should save user to database', async () => {
        service.addUserToDatabase(userTestData).subscribe(response => {
            expect(response).toEqual(userTestData);
        });

        const request = httpTestingController.expectOne(`${environment.apiBaseUrl}users/addUser`);
        expect(request.request.method).toEqual('POST');
        request.flush(userTestData);
    });
});
