import { Component, Input } from '@angular/core';
import { WhatsappUser } from 'src/app/models/user.model';
import { userTestData } from 'src/app/testData/user';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users: WhatsappUser[] | undefined;
}
