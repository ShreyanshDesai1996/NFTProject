import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule as NgRxEffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/user.effects';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgRxEffectsModule.forRoot([
            UserEffects,
            
        ]),
    ],
})
export class EffectsModule {}
