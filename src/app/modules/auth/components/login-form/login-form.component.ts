import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isLoading: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('eve.holt@reqres.in', [Validators.required]),
      password: new FormControl('cityslicka', [Validators.required]),
      overijssel: new FormControl(false)
    });
  }

  login() {
    const val = this.loginForm.value
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(val.email, val.password).subscribe(() => {
        this.isLoading = false;
        this.router.navigate([''])
      }, err => {
        this.isLoading = false;
        this.snackBar.open('Wrong email or password!')
      })
    }
  }
}
