import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentComponent } from './customerLayout/list-payment/list-payment.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ListStudentsComponent } from './customerLayout/list-students/list-students.component';
import { EditStudentComponent } from './customerLayout/edit-student/edit-student.component';
import { ListCoursesComponent } from './customerLayout/list-courses/list-courses.component';
import { EditCourseComponent } from './customerLayout/edit-course/edit-course.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ListStudentsComponent, canActivate: [AuthGuard] },
  { path: 'list-payment', component: ListPaymentComponent, canActivate: [AuthGuard] },
  { path: 'list-courses', component: ListCoursesComponent, canActivate: [AuthGuard] },
  { path: 'student-edit', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'course-edit', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'course-edit/:id', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'student-edit/:id', component: EditStudentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
