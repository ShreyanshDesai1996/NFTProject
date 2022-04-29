import { Component } from '@angular/core';
import { UsersFilter, WhatsappUser } from 'src/app/models/user.model';
import { userTestData } from 'src/app/testData/user';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent {
    userPageIndex = 0;
    userPageSize = 10;
    usersSearchText = '';
    userLength = 10;
    users: WhatsappUser[] = [userTestData, userTestData];

    applyUsersPageFilter(data: UsersFilter): void {
        console.log(data);
    }
}
