import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './containers/all-users/all-users.component';
import { HomeComponent } from './containers/home/home.component';
import { AuthGuardKeycloak } from './utils/app.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent, },

    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
