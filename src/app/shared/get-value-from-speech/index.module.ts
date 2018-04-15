import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule} from '@angular/cdk/portal';


import { GetValueFromSpeechDirective } from './container/index.directive';
import { ControlButtonsComponent,ContainerDirective } from './components/control-buttons/index.component'


@NgModule({
    imports: [
        CommonModule, 
        FormsModule, ReactiveFormsModule,
        FlexLayoutModule,
        OverlayModule,PortalModule,
        MatButtonModule, MatIconModule],
    exports: [ GetValueFromSpeechDirective],
    declarations: [GetValueFromSpeechDirective,ControlButtonsComponent,ContainerDirective],
    entryComponents: [ControlButtonsComponent]
})
export class GetValueFromSpeechModule { }
