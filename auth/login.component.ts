import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 @Component({
     selector: 'app-login',
    templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
 })
 export class LoginComponent {
     loginForm: FormGroup;
     errorMessage: string = '';
      constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
              username: ['', [Validators.required]],
           password: ['', [Validators.required]]
      });
   }

    onSubmit(): void {
     if (this.loginForm.valid) {
          this.authService.login(this.loginForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/inventory']);
            },
             error: (error) => {
                  this.errorMessage = 'Invalid credentials';
             }
        });
       }
     }
 }