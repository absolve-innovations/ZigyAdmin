import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  private apiUrl = 'https://developer.phonepe.com/v1/reference/pay-api-1';
  private apiKey = '0aa3b33f-f23e-4360-9805-e3f7dc7572c9';
  private merchantId = 'SVBPUAT';
  constructor(private http: HttpClient) { }

  initiatePayment(amount: number) {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.merchantId}:${this.apiKey}`)}`,
    });

    const payload = {
      amount: amount,
      // redirectUrl: 'https://zigykart.com',
      // additional payment details
    };

    return this.http.post<any>(this.apiUrl, payload, { headers });
  }
}
