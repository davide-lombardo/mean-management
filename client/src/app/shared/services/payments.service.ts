import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentDetails } from '../model/paymentDetails.model';
import { Observable } from 'rxjs';
import { AddPaymentRequest } from '../model/request/paymentRequest.model';
import { PaymentResponse } from '../model/response/paymentResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getPayments(): Observable<PaymentResponse> {
    const url = `${this.serverUrl}/payments`;
    return this.http.get<PaymentResponse>(url);
  };

  getPaymentById(id: string): Observable<PaymentDetails> {
    const url = `${this.serverUrl}/payments/${id}`;
    return this.http.get<PaymentDetails>(url);
  };

  addPayment(request: AddPaymentRequest): Observable<PaymentDetails> {
    const url = `${this.serverUrl}/payments`;
    return this.http.post<PaymentDetails>(url, request);
  };

  deletePayment(id: string): Observable<any> {
    const url = `${this.serverUrl}/payments/${id}`;
    return this.http.delete(url);
  };
}
