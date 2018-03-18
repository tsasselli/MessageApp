import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  myform: FormGroup;

  constructor(private authService: AuthService) {}

  onSubmit(){
    const user = new User(
      this.myform.value.email,
      this.myform.value.password,
      this.myform.value.firstName,
      this.myform.value.lastName
    );
    console.log(user);
    this.authService.signup(user)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
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
