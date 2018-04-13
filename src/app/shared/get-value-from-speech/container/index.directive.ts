
import { Component, Directive, ComponentRef, TemplateRef , Type ,Input, Renderer2,Output, ElementRef, EventEmitter, HostListener, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
import { ControlButtonsComponent } from '../components/control-buttons/index.component'

@Directive({
  selector: '[getValueFromSpeech]'
})
export class GetValueFromSpeechDirective {
 
  @Input('tooltip') content : string | TemplateRef<any> | Type<any>;
  
  private componentRef : ComponentRef<ControlButtonsComponent>;

  constructor( private element : ElementRef,
               private renderer : Renderer2,
               private resolver : ComponentFactoryResolver,
               private vcr : ViewContainerRef ) {
  }
  @HostListener('mouseenter')
  mouseenter() {
    if ( this.componentRef ) return;
    const factory = this.resolver.resolveComponentFactory(ControlButtonsComponent);
    this.componentRef = this.vcr.createComponent(factory);
    this.componentRef.onValue.subscribe(e=>{
      console.log(e)
    })
  }
  @HostListener('mouseout')
  mouseout() {
    this.destroy();
  }
  
  destroy() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }
  
  ngOnDestroy() {
    this.destroy();
  }
}


