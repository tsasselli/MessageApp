import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  myform: FormGroup;
  onSubmit(){
    console.log(this.myform)
    this.myform.reset();
  }
  ngOnInit(){
    this.myform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";')
      ]),
      password: new FormControl('', Validators.required)
    });
  }
}
