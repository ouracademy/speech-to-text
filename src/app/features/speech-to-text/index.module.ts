import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';

import { InputSpeechModule } from '@shared/input-speech/index.module';
import { RoutingModule } from './routing.module';

import { IndexComponent } from './container/index.component';

const routes: Routes = [
    { path: '', component: IndexComponent }
];

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, 
        FlexLayoutModule, MatCardModule,
        InputSpeechModule, 
        RoutingModule],
    declarations: [IndexComponent],
    providers: []
})
export class IndexModule { }
