import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
  myform: FormGroup;
  onSubmit(){
    console.log(this.myform)
    this.myform.reset();
  }
  ngOnInit(){
    this.myform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";')
      ]),
      password: new FormControl('', Validators.required)
    });
  }
}
