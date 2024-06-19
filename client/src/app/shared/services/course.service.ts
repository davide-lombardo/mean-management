import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CoursesResponse } from '../model/response/courseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getCourses(): Observable<CoursesResponse> {
    const url = `${this.serverUrl}/courses`;
    return this.http.get<CoursesResponse>(url);
  };

  // getSubscriptionById(id: string): Observable<SubscriptionDetails> {
  //   const url = `${this.serverUrl}/subscriptions/${id}`;
  //   return this.http.get<SubscriptionDetails>(url);
  // };

  // addSubscription(subscription: SubscriptionDetails): Observable<SubscriptionDetails> {
  //   const url = `${this.serverUrl}/subscriptions`;
  //   return this.http.post<SubscriptionDetails>(url, subscription);
  // };

  // deleteSubscription(id: string): Observable<any> {
  //   const url = `${this.serverUrl}/subscriptions/${id}`;
  //   return this.http.delete(url);
  // };

}
