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
import { CustomCookieService } from '../services/custom-cookie.service';
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
  selector: 'app-profile',
  template: `
    <form [formGroup]="registerForm" class="form">
      <mat-card>
        <mat-card-header>
          <mat-card-title><strong>Your account</strong></mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>e-mail</mat-label>
            <input matInput formControlName="email" />
          </mat-form-field>

          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>firstname</mat-label>
            <input matInput formControlName="firstname" />
          </mat-form-field>

          <mat-form-field class="full-width" floatLabel="always">
            <mat-label>lastname</mat-label>
            <input matInput formControlName="lastname" />
          </mat-form-field>
        </mat-card-content>
      </mat-card>
    </form>
  `,
})
export class ProfileComponent {
  public cookieService = inject(CustomCookieService);
  public registerForm!: FormGroup;
  public registerFormControls!: string[];
  public hidePassword = true;

  private formBuilder = inject(FormBuilder);

  @Output()
  cancelRegister = new EventEmitter();

  ngOnInit() {
    this.createForm();
    this.registerFormControls = this.loopThroughFormControls();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl({
        value: this.cookieService.getUserEmail(),
        disabled: true,
      }),
      firstname: new FormControl({
        value: this.cookieService.getUserFirstname(),
        disabled: true,
      }),
      lastname: new FormControl({
        value: this.cookieService.getUserLastname(),
        disabled: true,
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
}
