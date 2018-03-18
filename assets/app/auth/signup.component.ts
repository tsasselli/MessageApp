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
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";')
      ]),
      password: new FormControl('', Validators.required)
    });
  }
}
