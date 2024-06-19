import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentComponent } from './customerLayout/list-payment/list-payment.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ListStudentsComponent } from './customerLayout/list-students/list-students.component';
import { EditStudentComponent } from './customerLayout/edit-student/edit-student.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ListStudentsComponent, canActivate: [AuthGuard] },
  { path: 'list-payment', component: ListPaymentComponent, canActivate: [AuthGuard] },
  { path: 'student-edit/:id', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'student-edit', component: EditStudentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
