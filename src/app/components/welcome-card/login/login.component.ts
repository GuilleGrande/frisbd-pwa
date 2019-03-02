import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password () {
    return this.loginForm.get('password');
  }

  async login() {
    return this.auth.loginWithEmail(this.email.value, this.password.value)
                  .then(() => {
                    console.log('[LOGIN COMP] Login succesfull');
                  });
  }

}
