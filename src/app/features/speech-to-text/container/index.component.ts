import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-speech',
  templateUrl: 'index.component.html'
})
export class IndexComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
      this.buildForm();

  }
  onChange(v){
    console.log(v)
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


}
