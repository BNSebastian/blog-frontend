import { Component, inject } from '@angular/core';
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

import { FRONTEND } from '../../../shared/environments/frontend';
import { PaypalService } from '../../services/paypal.service';

@Component({
  selector: 'app-payment-form',
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
  template: `
    <div class="container">
      <form [formGroup]="loginForm" novalidate (ngSubmit)="initiatePayment()">
        <mat-card>
          <mat-card-header>
            <mat-card-title><strong>Donate</strong></mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <mat-form-field class="full-width" floatLabel="always">
              <mat-label>price</mat-label>
              <input matInput formControlName="price" />
            </mat-form-field>

            <mat-form-field class="full-width" floatLabel="always">
              <mat-label>currency</mat-label>
              <input matInput formControlName="currency" />
            </mat-form-field>

            <mat-form-field class="full-width" floatLabel="always">
              <mat-label>description</mat-label>
              <input matInput formControlName="description" />
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
          </mat-card-actions>
        </mat-card>
      </form>
    </div>
  `,
  styles: `
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    form {}
  `,
})
export class PaymentForm {
  private paypalService = inject(PaypalService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public loginForm!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      price: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      currency: new FormControl('USD', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      method: new FormControl('paypal', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      intent: new FormControl('sale', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl('buy me a coffee', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initiatePayment() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.paypalService.initiatePaymentRequest(formData).subscribe(
        (response) => {
          window.location.href = response;
        },
        (error) => {
          this.router.navigateByUrl(FRONTEND.getHome());
        }
      );
    }
  }
}
