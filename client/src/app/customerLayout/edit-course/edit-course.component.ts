import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
import { CreateCourseRequest } from 'src/app/shared/model/request/courseRequest.model';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  public myForm!: FormGroup;
  private courseId!: string;
  public courses = new Set<string>();
  public isEditMode: boolean = false;
  public levels: string[] = [];
  public categories: string[] = [];

  public isLoading: boolean = false;

  constructor(
    private courseService: CourseService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadLevelsAndCategories();
    this.initForm();
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('id')) return;
      this.isLoading = true;
      this.isEditMode = true;
      this.courseId = paramMap.get('id')!;
      this.courseService.getCourseById(this.courseId).subscribe((course: any) => {
        this.initFormWithValues(course);
        this.isLoading = false;
      });
    })
  }

  private loadLevelsAndCategories(): void {
    // Load levels and categories from the service
    this.levels = this.courseService.getLevels();
    this.categories = this.courseService.getCategories();
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      maxStudents: new FormControl('', Validators.required),
    });
  };

  private initFormWithValues(course: any): void {
    this.myForm.patchValue({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      maxStudents: course.maxStudents,
    });
  };

  public onSaveCourse(): void {
    if (this.myForm.invalid) return;
    this.isLoading = true;
    const courseData: CreateCourseRequest = this.myForm.value;

    if (this.isEditMode) {
      courseData._id = this.courseId; // Add the course ID for updating
        this.courseService.patchCourse(courseData).subscribe(() => {
            this.router.navigate(['/list-courses']);
            this._snackBar.openFromComponent(CustomSnackBarComponent, {
                duration: 3000,
                data: 'Corso aggiornato con successo',
            });
            this.isLoading = false;
        });
    } else {
      this.courseService.addCourse(courseData).subscribe((newCorse) => {
 
        this.router.navigate(['/']);
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
            duration: 3000,
            data: 'Corso aggiunto con successo',
        });
        this.isLoading = false;
      })
    }
  }

}
