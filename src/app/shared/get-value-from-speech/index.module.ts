import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';



import { GetValueFromSpeechDirective } from './container/index.directive';
import { ControlButtonsComponent } from './components/control-buttons/index.component'


@NgModule({
    imports: [
        CommonModule, 
        FormsModule, ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
    exports: [ GetValueFromSpeechDirective, ControlButtonsComponent],
    declarations: [GetValueFromSpeechDirective,ControlButtonsComponent]
})
export class GetValueFromSpeechModule { }
