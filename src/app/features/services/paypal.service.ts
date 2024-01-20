import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BACKEND } from '../../shared/environments/backend';
import { ForumPostInterface } from '../models/forum';
import { PaymentInterface } from '../models/paypal';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private http = inject(HttpClient);

  // Method to initiate payment request and return the PayPal approval URL
  // Input: request - PaymentInterface object
  // Output: Observable<string>
  initiatePaymentRequest(request: PaymentInterface): Observable<string> {
    // Send a POST request to the backend with the payment request
    return this.http
      .post<any>(BACKEND.initiatePayment(), request, {
        responseType: 'text' as 'json',
      })
      .pipe(
        // Use the map operator to extract the response and return as a string
        map((response: string) => {
          return response;
        })
      );
  }

  paymentSuccess(paymentId: string, payerId: string): Observable<string> {
    return this.http.get<string>(BACKEND.paymentSuccess(paymentId, payerId));
  }
}
