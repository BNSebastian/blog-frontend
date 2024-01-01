import { CommonModule } from '@angular/common';
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
import { UserService } from '../services/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  selector: 'app-signup',
  template: `
    <form
      [formGroup]="registerForm"
      novalidate
      (ngSubmit)="register()"
      class="form"
    >
      <mat-card>
        <mat-card-header>
          <mat-card-title><strong>Your account</strong></mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>e-mail</mat-label>
            <input matInput formControlName="email" />
            @if (registerForm.controls['email'].hasError('required')) {
            <mat-error>e-mail address is <strong>required</strong></mat-error>
            }
          </mat-form-field>

          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>firstname</mat-label>
            <input matInput formControlName="firstname" />
            @if (registerForm.controls['firstname'].hasError('required')) {
            <mat-error>firstname is <strong>required</strong></mat-error>
            }
          </mat-form-field>

          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>lastname</mat-label>
            <input matInput formControlName="lastname" />
            @if (registerForm.controls['lastname'].hasError('required')) {
            <mat-error>lastname is <strong>required</strong></mat-error>
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
            @if (registerForm.controls['password'].hasError('required')) {
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
            [disabled]="registerForm.invalid"
          >
            Signup
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
export class SignupComponent {
  private authService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public registerForm!: FormGroup;
  public registerFormControls!: string[];
  public hidePassword = true;

  @Output()
  cancelRegister = new EventEmitter();

  ngOnInit() {
    this.createForm();
    this.registerFormControls = this.loopThroughFormControls();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      firstname: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastname: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  loopThroughFormControls() {
    if (this.registerForm) {
      const controlKeys = Object.keys(this.registerForm.controls);
      return controlKeys;
    }
    return [];
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authService.register(formData).subscribe(
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
