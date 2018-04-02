
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const ADD_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSpeechComponent),
  multi: true
};


@Component({
  selector: 'input-speech',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss'],
  providers: [ADD_INPUT_VALUE_ACCESSOR]
})
export class InputSpeechComponent implements ControlValueAccessor {
  @Input() title
  @Input() placeholder
  inputCtrl: FormControl
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };
  recognition
  status = {
    paused: 1,
    stop: 2,
    start: 3
  }
  currentStatus = null
  constructor() {
    this.inputCtrl = new FormControl("");
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
        this.updateInput(transcript);
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
    this.inputCtrl.valueChanges.subscribe(data=>{
         this.onModelChange(this.inputCtrl.value)
    })
  }
  updateInput(added) {
    let last = this.inputCtrl.value;
    this.inputCtrl.setValue(last + " " + added)
  }
  writeValue(value) {
    if (value) {
      this.inputCtrl.setValue(value)
    }
  }
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
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
