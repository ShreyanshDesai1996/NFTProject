import { UsersResponse, WhatsappUser } from '../models/user.model';

const userTestData: WhatsappUser = {
    whatsappName: 'Test User',
    assignedName: 'Test User',
    phone: '8792373687',
    keycloakUserId: 'testId',
    emailAddress: 'test@test.com',
    broadcastListSubs: ['test'],
    broadcastListUnSubs: ['test'],
    botState: 'Test State',
    botEnabled: true,
    createdAt: '27-12-2021',
};

export { userTestData };

const usersResponseData: UsersResponse = {
    content: [],
    totalElements: 10,
    totalPages: 2,
};

export { usersResponseData };
