import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

const imports = [
  ReactiveFormsModule, 
  CommonModule, 
  RouterModule, 
  HeaderComponent, 
  FooterComponent
];

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: imports,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.email]],
      lastname: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onSignup(): void {
    if (this.signupForm.valid) {
      // this.authService.signup(this.signupForm.value).subscribe(
      //   response => {
      //     // Handle successful signup, e.g., navigate to login
      //   },
      //   error => {
      //     // Handle error, e.g., show error message
      //   }
      // );
    }
  }
}
