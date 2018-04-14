
import { Output, EventEmitter,ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Injector, Input, ReflectiveInjector, Renderer2, TemplateRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { ControlButtonsComponent } from '../components/control-buttons/index.component'
import { NgControl } from "@angular/forms";
@Directive({
  selector: '[getValueFromSpeech]'
})
export class GetValueFromSpeechDirective {

  @Input('content') content: TemplateRef<any> | Type<any>;


  private componentRef: ComponentRef<ControlButtonsComponent>;

  constructor(
    private element: ElementRef,
    private control : NgControl,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef) {
  }
  @HostListener('mouseenter')
  mouseenter() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(ControlButtonsComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'config',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);

    this.componentRef = this.vcr.createComponent(factory, 0, injector);
    this.componentRef.instance.onValue.subscribe(e => {
      this.control.control.setValue(e);
    })
    this.componentRef.instance.onClose.subscribe(e => {
      this.destroy();
    })
  }

 
  destroy() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroy();
  }
}


