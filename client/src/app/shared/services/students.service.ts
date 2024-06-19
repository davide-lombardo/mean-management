import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionDetails } from '../model/subscriptionDetails.model';
import { environment } from 'src/environments/environment';
import { StudentDetails } from '../model/response/studentResponse.model';
import { CreateStudentRequest } from '../model/request/studentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getStudents(currentPage: number, studentsPerPage: number) {
    const queryParams = `?limit=${studentsPerPage}&page=${currentPage}`;
    const url = `${this.serverUrl}/students` + queryParams;
    return this.http.get<{ message: string; students: StudentDetails[]; countStudents: number; }>(url);
  };

  getStudentById(studentId: string): Observable<StudentDetails> {
    const url = `${this.serverUrl}/students/${studentId}`;
    return this.http.get<any>(url);
  };

  addStudent(student: CreateStudentRequest): Observable<StudentDetails> {
    const url = `${this.serverUrl}/students`;
    return this.http.post<any>(url, student);
  };

  patchStudent(student: CreateStudentRequest) {
    const id = student._id;
    const url = `${this.serverUrl}/students/${id}`;
    return this.http.patch(url, student);
  };

  deleteStudent(studentId: string) {
    const url = `${this.serverUrl}/students/${studentId}`;
    return this.http.delete(url);
  };

  getSubscription(): Observable<SubscriptionDetails[]> {
    return this.http.get<SubscriptionDetails[]>(`${this.serverUrl}/subscriptions`);
  }
}
