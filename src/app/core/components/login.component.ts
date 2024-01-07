import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { frontendUrl } from '../../shared/environments/frontend';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" novalidate (ngSubmit)="authenticate()">
      <mat-card>
        <mat-card-header>
          <mat-card-title><strong>Your account</strong></mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>e-mail</mat-label>
            <input matInput formControlName="email" />
            @if (loginForm.controls['email'].hasError('required')) {
            <mat-error>e-mail address is <strong>required</strong></mat-error>
            }
          </mat-form-field>
          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>password</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="hidePassword ? 'password' : 'text'"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="hidePassword = !hidePassword"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hidePassword"
            >
              <mat-icon>{{
                hidePassword ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
            @if (loginForm.controls['password'].hasError('required')) {
            <mat-error>Password is <strong>required</strong></mat-error>
            }
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            class="form-button"
            color="primary"
            type="submit"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>
          <button
            mat-raised-button
            class="form-button"
            color="primary"
            (click)="cancel()"
          >
            Cancel
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class LoginComponent {
  private userService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public loginForm!: FormGroup;
  public hidePassword = true;

  @Output()
  cancelRegister = new EventEmitter();

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  authenticate() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.userService.authenticate(formData).subscribe(
        (response) => {
          console.log(response);
          this.cancel();
        },
        (error) => {
          console.log(error);
          this.notFound();
        }
      );

      this.router.navigateByUrl(frontendUrl.home);
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl(frontendUrl.home);
  }

  notFound() {
    this.cancelRegister.emit(false);
    this.router.navigateByUrl('/404');
  }
}
