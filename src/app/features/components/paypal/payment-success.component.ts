import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FRONTEND } from '../../../shared/environments/frontend';
import { PaypalService } from '../../services/paypal.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ``,
  styles: ``,
})
export class PaymentSuccess {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paypalService = inject(PaypalService);

  ngOnInit(): void {
    // Subscribe to the paramMap observable to get the query parameters
    this.route.queryParams.subscribe((params) => {
      // Get the values of paymentId and PayerID
      const paymentId = params['paymentId'];
      const payerId = params['PayerID'];

      // Log the extracted values
      console.log('paymentId:', paymentId);
      console.log('PayerID:', payerId);

      this.paypalService
        .paymentSuccess(paymentId, payerId)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate([FRONTEND.getHome()]);
        });
      this.router.navigate([FRONTEND.getHome()]);
      // Now, you can send these values to your backend or perform any other actions.s
    });
  }
}
