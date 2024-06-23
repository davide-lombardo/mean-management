import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Course, CoursesListResponse } from '../model/response/courseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  private CourseCategory = {
    Technology: 'Technology',
    Languages: 'Languages',
    Arts: 'Arts',
    Business: 'Business',
    Health: 'Health',
    Science: 'Science',
    Humanities: 'Humanities',
    Programming: 'Programming',
    Design: 'Design',
    Marketing: 'Marketing'
  };

  private CourseLevel = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced'
  };

  getLevels(): string[] {
    return Object.values(this.CourseLevel);
  }

  getCategories(): string[] {
    return Object.values(this.CourseCategory);
  }

  getCourses(currentPage: number, coursesPerPage: number): Observable<CoursesListResponse> {
    const queryParams = `?limit=${coursesPerPage}&page=${currentPage}`;
    const url = `${this.serverUrl}/courses` + queryParams;
    return this.http.get<{ status: string; courses: any[]; countCourses: number; }>(url);
  };

  getCourseById(id: string): Observable<Course> {
    const url = `${this.serverUrl}/courses/${id}`;
    return this.http.get<any>(url);
  };

  addCourse(course: any): Observable<Course> {
    const url = `${this.serverUrl}/courses`;
    return this.http.post<any>(url, course);
  };

  deleteCourse(id: string) {
    const url = `${this.serverUrl}/courses/${id}`;
    return this.http.delete(url);
  };

  patchCourse(course: any) {
    const id = course._id;
    const url = `${this.serverUrl}/courses/${id}`;
    return this.http.patch(url, course);
  };

}
