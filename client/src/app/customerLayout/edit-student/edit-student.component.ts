import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
import { AddPaymentRequest } from 'src/app/shared/model/request/paymentRequest.model';
import { CreateStudentRequest } from 'src/app/shared/model/request/studentRequest.model';
import { Course } from 'src/app/shared/model/response/courseResponse.model';
import { StudentDetails } from 'src/app/shared/model/response/studentResponse.model';
import { SubscriptionType } from 'src/app/shared/model/response/subscriptionResponse.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  public myForm!: FormGroup;
  private subscriptionsDetails: SubscriptionType[] = [];
  private coursesDetails: Course[] = [];
  private studentId!: string;
  public subscriptions = new Set<number>();
  public weeklyLessons = new Set<number>();
  public courses = new Set<string>();
  public isEditMode: boolean = false;
  public isLoading: boolean = false;

  public coursesPerPage: number = 5;
  public currentPage: number = 0;

  constructor(
    private studentsService: StudentsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private paymentsService: PaymentsService,
    private courseService: CourseService,
    private _snackBar: MatSnackBar,
  ) {
    this.getSubscriptionTypes();
    this.getCourses();
  }

  ngOnInit(): void {
    this.initForm();
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('id')) return;
      this.isLoading = true;
      this.isEditMode = true;
      this.studentId = paramMap.get('id')!;
      this.studentsService.getStudentById(this.studentId).subscribe((student: StudentDetails) => {
        this.initFormWithValues(student);
        this.isLoading = false;
      });
    })
  }

  private getSubscriptionTypes(): void {
    this.subscriptionService.getSubscriptions()
      .pipe(
        tap(val => {
          this.subscriptionsDetails = val
          console.log('this.subscriptionsDetails', this.subscriptionsDetails);
          this.populatedInput();
        })
      ).subscribe()
  }

  private getCourses(): void {
    this.courseService.getCourses(this.currentPage, this.coursesPerPage)
      .pipe(
        tap(res => {
          this.coursesDetails = res.courses;
          this.populatedCourseInput();
        })
      ).subscribe()
  }

  private populatedCourseInput(): void {
    if (!this.coursesDetails) return;
    this.coursesDetails.map(course => {
      this.courses.add(course.title);
    })
  }

  private populatedInput(): void {
    if (!this.subscriptionsDetails) return;
    this.subscriptionsDetails.map(subscription => {
      this.subscriptions.add(subscription.subscriptionDuration);
    })
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      birth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      subscriptionDuration: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
    });
  };

  private initFormWithValues(student: StudentDetails): void {
    this.myForm.patchValue({
      name: student.name,
      surname: student.surname,
      birth: student.birth,
      gender: student.gender,
      subscriptionDuration: student.subscriptionDuration,
      course: student.course.title,
    });
  };

  public onSaveStudent(): void {
    if (this.myForm.invalid) return;
    this.isLoading = true;
    const studentData: CreateStudentRequest = this.myForm.value;

    if (this.isEditMode) {
        studentData._id = this.studentId; // Add the student ID for updating
        this.studentsService.patchStudent(studentData).subscribe(() => {
            this.router.navigate(['/']);
            this._snackBar.openFromComponent(CustomSnackBarComponent, {
                duration: 3000,
                data: 'Studente aggiornato con successo',
            });
            this.isLoading = false;
        });
    } else {
        const subscription = this.subscriptionsDetails.find(sub => sub.subscriptionDuration === studentData.subscriptionDuration);
        const course = this.coursesDetails.find(course => course.title === studentData.course);

        if (subscription?._id && course?._id) {
            studentData.subscription = subscription._id;
            studentData.course = course._id;

            this.studentsService.addStudent(studentData).subscribe((newStudent) => {
                if (newStudent && newStudent._id) {
                    this.createPaymentForStudent(newStudent._id, subscription._id, course._id);
                }
                this.router.navigate(['/']);
                this._snackBar.openFromComponent(CustomSnackBarComponent, {
                    duration: 3000,
                    data: 'Studente aggiunto con successo',
                });
                this.isLoading = false;
            });
        } else {
            this.isLoading = false;
            this._snackBar.openFromComponent(CustomSnackBarComponent, {
                duration: 3000,
                data: 'Errore: Subscription o Course non trovati',
            });
        }
    }
}

  private createPaymentForStudent(studentId: string, subscriptionId: string, courseId: string): void {
    const paymentData: AddPaymentRequest = {
        student: studentId,
        paymentDate: new Date(),
        subscription: subscriptionId,
        course: courseId
    };
    this.paymentsService.addPayment(paymentData).subscribe(() => {
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
            duration: 3000,
            data: 'Pagamento aggiunto con successo',
        });
    });
  }

}
