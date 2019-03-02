import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      email: ['', [ Validators.required ]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]/*,
      confirmPassword: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]*/
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password () {
    return this.registerForm.get('password');
  }

  register() {
    return this.auth.registerUser(this.email.value, this.password.value)
            .then(() => {
              console.log('[REGISTER COMP] Registration successfull')
            });
  }

}
