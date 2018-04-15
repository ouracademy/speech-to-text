
import { Output, EventEmitter, Directive, TemplateRef,ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from "@angular/forms";
import { Overlay, OverlayConfig, OverlayRef, OriginConnectionPosition } from '@angular/cdk/overlay';
import { ComponentPortal, Portal } from '@angular/cdk/portal';

import { ControlButtonsComponent } from '../components/control-buttons/index.component'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';

@Directive({
  selector: '[getValueFromSpeech]'
})
export class GetValueFromSpeechDirective {
  private _position
  private _config: OverlayConfig = {}

  @Input('template') templateRef: TemplateRef<any>;
  @Input('position') set position(data) {
    switch (data) {
      case "above":
        this._position = this.overlay
          .position()
          .connectedTo(
            this.element, { originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        this._config.positionStrategy = this._position
        break;
    }
  }
  _overlayRef: OverlayRef

  constructor(
    public overlay: Overlay,
    private element: ElementRef,
    private control: NgControl) {

    this._position = this.overlay
      .position()
      .connectedTo(
        this.element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });

    this._config = new OverlayConfig({ positionStrategy: this._position });
  }

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }

  @HostListener('mouseenter')
  mouseenter() {
    this._detach();
    this.openPanel().subscribe((ref: ComponentRef<ControlButtonsComponent>) => {
      ref.instance.onValue.subscribe(e => {
        this.control.control.setValue(this.control.control.value + e);
      })
      ref.instance.onClose.subscribe(e => {
        this.destroy();
      })
    })
  }

  openPanel(): Observable<ComponentRef<ControlButtonsComponent>> {
    this._overlayRef = this.overlay.create(this._config);
    return of(this._overlayRef.attach(new ComponentPortal(ControlButtonsComponent)))
  }
  destroy() {
    this._detach()
  }
  ngOnDestroy() {
    this.destroy();
  }
}


