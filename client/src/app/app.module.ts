import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubscriptionTypePipe } from './shared/pipes/subscriptionTypePipe';
import { CustomerStatusDirective } from './shared/directives/customerStatus.directive';
import { ListPaymentComponent } from './customerLayout/list-payment/list-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DialogComponent } from './shared/dialog/dialog.component';
import { CustomSnackBarComponent } from './shared/custom-snack-bar/custom-snack-bar.component';
import { ListStudentsComponent } from './customerLayout/list-students/list-students.component';
import { EditStudentComponent } from './customerLayout/edit-student/edit-student.component';
import { PageLayoutComponent } from './customerLayout/page-layout/page-layout.component';
import { SubscriptionStatusPipe } from './shared/pipes/subscription-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionTypePipe,
    SubscriptionStatusPipe,
    CustomerStatusDirective,
    ListPaymentComponent,
    ListStudentsComponent,
    EditStudentComponent,
    LoginComponent,
    DialogComponent,
    CustomSnackBarComponent,
    PageLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
