import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';
import { reducers } from 'src/app/store/reducers';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let routerSpy: jasmine.Spy;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [
                StoreModule.forRoot(reducers),
                HttpClientModule,
                RouterTestingModule,
                MaterialModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.inject(Router);
        routerSpy = spyOn(router, 'navigateByUrl');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to home when goHome method is called', () => {
        component.goHome();
        expect(routerSpy).toHaveBeenCalledWith('/home/0');
    });

    it('should emit onLogoutClick when logout method is called', () => {
        const emitSpy = spyOn(component.onLogoutClick, 'emit');
        component.logout();
        expect(emitSpy).toHaveBeenCalledWith();
    });

    it('should emit onThemeChange when setTheme method is called', () => {
        const emitSpy = spyOn(component.onThemeChange, 'emit');
        component.setTheme('dark');
        expect(emitSpy).toHaveBeenCalledWith('dark');
    });
});
