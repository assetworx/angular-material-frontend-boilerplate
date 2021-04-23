import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  isLoading: boolean = false;
  registerForm: FormGroup;
  matcher = new PasswordStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {
      this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmpassword: new FormControl('')
      }, {validators: this.checkPasswords as ValidatorFn})
   }

  ngOnInit(): void {}

  register() {
    const val = this.registerForm.value
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(val.email, val.password).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['home'])
      }, err => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong, email already exists?')
      })
    }
  }

  checkPasswords(registerForm: FormGroup) {
    const password = registerForm.get('password')!.value;
    const confirmPassword = registerForm.get('confirmpassword')!.value;

    return password === confirmPassword ? null : { notSame: true }     
  }
}