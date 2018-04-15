
import { Component, Directive, Input, Inject, Output, ViewChild,  ElementRef, EventEmitter} from '@angular/core';

@Directive({
  selector: '.container'
})
export class ContainerDirective {
}



@Component({
  selector: 'control-buttons',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class ControlButtonsComponent  {

  top : string;
  @ViewChild(ContainerDirective, { read: ElementRef }) private container;

  value:string = ""
  recognition
  status = {
    paused: 1,
    stop: 2,
    start: 3
  }
  currentStatus = null
  
  @Output() onValue = new EventEmitter()
  @Output() onClose = new EventEmitter()

  constructor(/*@Inject('config') private config*/) {

  }
  ngOnInit() {
   // const {top} = this.config.host.getBoundingClientRect();
   // const {height} = this.container.nativeElement.getBoundingClientRect();
   // console.log(height)
    //this.top = `${top - height}px`;

    try {
      var SpeechRecognition = window["SpeechRecognition"] || window["webkitSpeechRecognition"];
      this.recognition = new SpeechRecognition();
    }
    catch (e) {
      console.error(e);
    }
    
    this.recognition.continuous = true;
    this.recognition.onresult = (event) => {
      console.log("re",event)
      var current = event.resultIndex;
      var text = event.results[current][0].transcript;
      var mobileRepeatBug = (current == 1 && text == event.results[0][0].transcript);
      if (!mobileRepeatBug) {
        this.updateValue(text);
      }
      event["stopPropagation"]()
    };

    this.recognition.onstart = (e) => {
      console.log("start",e)
      // instructions.text('Voice recognition activated. Try speaking into the microphone.');
    }

    this.recognition.onspeechend = (e) =>{
      console.log("doing",e)
      //instructions.text('You were quiet for a while so voice recognition turned itself off.');
    }

    this.recognition.onerror = function (event) {
      if (event.error == 'no-speech') {
        //instructions.text('No speech was detected. Try again.');
      };
    }
  }
  updateValue(text) {
    console.log("updating")
    this.value = this.value + text
    this.onValue.emit(this.value)
  }
  start() {
    this.recognition.start();
    this.currentStatus = this.status.start
  }
  isCurrentStatus(status) {
    return this.currentStatus == status
  }
  save() {
    this.recognition.stop();
    this.currentStatus = this.status.stop
  }
  pause() {
    this.recognition.stop();
    this.currentStatus = this.status.paused
    
  }
  close(){
    this.onClose.emit()
  }
}
