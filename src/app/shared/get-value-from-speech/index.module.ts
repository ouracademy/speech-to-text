import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';



import { GetValueFromSpeechDirective } from './container/index.directive';
import { ControlButtonsComponent,ContainerDirective } from './components/control-buttons/index.component'


@NgModule({
    imports: [
        CommonModule, 
        FormsModule, ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
    exports: [ GetValueFromSpeechDirective],
    declarations: [GetValueFromSpeechDirective,ControlButtonsComponent,ContainerDirective],
    entryComponents: [ControlButtonsComponent]
})
export class GetValueFromSpeechModule { }
