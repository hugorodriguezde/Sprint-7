import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, RouterLink],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordsMatch(passwordsMatch: any) {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).pipe(
        catchError(err => {
          console.error(err);
          if (err.error) {
            if (err.error.mensaje === 'Email is already registered.') {
              const formControl = this.registerForm.get('email');
              if (formControl) {
                formControl.setErrors({
                  serverError: true
                }, {emitEvent: false});
              }
            }
          }
          return of(null);
        })
      ).subscribe(res => {
        console.log(res);
        if (res) {
          this.router.navigate(['/']); // navigate to homepage
        }
      });
    }
  }
}
