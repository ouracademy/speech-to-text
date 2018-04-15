import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import JSONFormatter from 'json-formatter-js'




@Component({
  selector: 'app-speech',
  templateUrl: 'index.component.html'
})
export class IndexComponent {
  form: FormGroup;
  valueFormated
  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

  }


  buildForm(): void {
    this.form = this.fb.group({
      'text': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]]
    });
  }
  save(element: HTMLElement) {
    const formatter = new JSONFormatter(this.form.value);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(formatter.render());
  }

}
