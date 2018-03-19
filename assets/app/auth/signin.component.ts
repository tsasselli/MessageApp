import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
  myform: FormGroup;

constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    const user = new User(this.myform.value.email, this.myform.value.password);
    this.authService.signin(user)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/');
      },
      error => console.error(error)
    );
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
