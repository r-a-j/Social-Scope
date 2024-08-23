import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const imports = [
  ReactiveFormsModule,
  CommonModule,
  RouterModule
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: imports,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      // this.authService.login(this.loginForm.value).subscribe(
      //   response => {
      //     // Handle successful login, e.g., navigate to dashboard
      //   },
      //   error => {
      //     // Handle error, e.g., show error message
      //   }
      // );
    }
  }
}
