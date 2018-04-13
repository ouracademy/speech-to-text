
import { Component, Input, Output, EventEmitter, forwardRef, EventEmitter} from '@angular/core';




@Component({
  selector: 'control-buttons',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class ControlButtonsComponent  {


  value:string
  recognition
  status = {
    paused: 1,
    stop: 2,
    start: 3
  }
  currentStatus = null
  
  @Output() onValue = new EventEmitter()
  constructor() {

  }
  ngOnInit() {
    try {
      var SpeechRecognition = window["SpeechRecognition"] || window["webkitSpeechRecognition"];
      this.recognition = new SpeechRecognition();
    }
    catch (e) {
      console.error(e);
    }
    this.recognition.continuous = true;
    this.recognition.onresult = (event) => {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
      var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
      if (!mobileRepeatBug) {
        this.updateValue(text);
      }
    };

    this.recognition.onstart = function () {
      // instructions.text('Voice recognition activated. Try speaking into the microphone.');
    }

    this.recognition.onspeechend = function () {
      //instructions.text('You were quiet for a while so voice recognition turned itself off.');
    }

    this.recognition.onerror = function (event) {
      if (event.error == 'no-speech') {
        //instructions.text('No speech was detected. Try again.');
      };
    }
  }
  updateValue(text) {
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
}
