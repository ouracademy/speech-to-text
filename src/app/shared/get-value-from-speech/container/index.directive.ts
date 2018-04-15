
import { Output, EventEmitter, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Injector, Input, ReflectiveInjector, Renderer2, TemplateRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { NgControl } from "@angular/forms";
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, Portal } from '@angular/cdk/portal';

import { ControlButtonsComponent } from '../components/control-buttons/index.component'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';

@Directive({
  selector: '[getValueFromSpeech]'
})
export class GetValueFromSpeechDirective {

  @Input('template') templateRef: TemplateRef<any>;


  private componentRef: ComponentRef<ControlButtonsComponent>;
  _overlayRef: OverlayRef

  constructor(
    public overlay: Overlay,
    private element: ElementRef,
    private control: NgControl,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef) {
  }

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }

  @HostListener('mouseenter')
  mouseenter() {

    this.openPanel().subscribe((ref: ComponentRef<ControlButtonsComponent>) => {
      ref.instance.onValue.subscribe(e => {
        console.log("nuevo c", e)
        this.control.control.setValue(e);
      })
      ref.instance.onClose.subscribe(e => {
        this.destroy();
      })

      this.control.valueChanges.subscribe(e => {
        console.log("va", e)
        //this.componentRef.instance.value = e
      })

    })


    /* if (this.componentRef) return;
     const factory = this.resolver.resolveComponentFactory(ControlButtonsComponent);
     const injector = ReflectiveInjector.resolveAndCreate([
       {
         provide: 'config',
         useValue: {
           host: this.element.nativeElement
         }
       }
     ]);
 
     this.componentRef = this.vcr.createComponent(factory, 0, injector);*/

  }

  openPanel(): Observable<ComponentRef<ControlButtonsComponent>> {
    this._detach()
    let strategy = this.overlay.position()
      .connectedTo(
        this.element,
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' });

    let config = new OverlayConfig({ positionStrategy: strategy });
    this._overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(ControlButtonsComponent);
    return of(this._overlayRef.attach(portal))

  }





  destroy() {
    /*this.componentRef && this.componentRef.destroy();
    this.componentRef = null;*/

    this._detach()
    
  }

  ngOnDestroy() {
    this.destroy();
  }
}


