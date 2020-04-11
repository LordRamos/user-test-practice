import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../core/models/user';
import { AuthenticationService } from '../core/services/authentication.service';
import { TokenStorageService } from '../core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }
  getFormData() {
    const formValue = this.formLogin.getRawValue()
    return {
      email: formValue.email,
      password: formValue.password,
    } as User
  }
  onSubmit() {
    if (!this.formLogin.invalid) {
      const user = this.getFormData();
      this.authenticationService.login(user).subscribe(data => {
        this.invalidLogin = !data['access'];
        if (data['access']) {
          this.tokenStorageService.setTokens(data);
          this.router.navigate(['/user/list']);
        }
      }, error => {
        this.invalidLogin = true;
      }
      );
    }
  }
}
