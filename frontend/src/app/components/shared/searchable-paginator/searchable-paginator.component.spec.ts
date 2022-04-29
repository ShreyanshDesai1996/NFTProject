import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchablePaginatorComponent } from './searchable-paginator.component';

describe('SearchablePaginatorComponent', () => {
    let component: SearchablePaginatorComponent;
    let fixture: ComponentFixture<SearchablePaginatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchablePaginatorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchablePaginatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
