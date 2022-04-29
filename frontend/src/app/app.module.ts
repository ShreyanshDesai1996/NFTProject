import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utils/app.init';
import { NavbarComponent } from './components/impl/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { HomeComponent } from './containers/home/home.component';
import { EffectsModule } from './store/effects/effects.module';
import { NavigationCardsComponent } from './components/impl/navigation-cards/navigation-cards.component';
import { SearchablePaginatorComponent } from './components/shared/searchable-paginator/searchable-paginator.component';
import { AllUsersComponent } from './containers/all-users/all-users.component';
import { UsersTableComponent } from './components/impl/users-table/users-table.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        NavigationCardsComponent,
        SearchablePaginatorComponent,
        AllUsersComponent,
        UsersTableComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule,
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
    ],
    providers: [
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: initializeKeycloak,
        //     multi: true,
        //     deps: [KeycloakService],
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
