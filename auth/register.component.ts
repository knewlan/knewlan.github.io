// register.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // Initialization logic, if needed
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/login']);
                    },
                    error: (error) => {
                        this.errorMessage = 'Registration failed. Please try again.';
                        console.error('Registration error: ', error);
                    }
                });
        } else {
             this.errorMessage = 'Form is invalid. Please fill all fields';
        }
    }
}