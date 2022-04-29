import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { mockStoreData } from 'src/app/testData/mockStore';
import { userStateData } from 'src/app/testData/user';
import { reducers } from '..';
import { getTheme, getUser } from './user.reducer';

describe('User : Selectors', () => {
    const initialState = mockStoreData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(reducers)],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
    });

    it('should return user  when calling userData', () => {
        expect(getUser(userStateData)).toEqual(userStateData.user);
    });

    it('should return theme  when calling themeData', () => {
        expect(getTheme(userStateData)).toEqual(userStateData.theme);
    });
});
