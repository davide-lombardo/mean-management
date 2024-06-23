import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { StudentDetails } from 'src/app/shared/model/response/studentResponse.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss'],
})
export class ListCoursesComponent {
  public isLoading: boolean = false;
  public displayedColumns: string[] = [
    'title',
    'description',
    'category',
    'level',
    'status',
    'maxStudents',
    'enrolledStudents',
    'actions',
  ];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public totalCourses: number = 0;
  public coursesPerPage: number = 5;
  public currentPage: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.isLoading = true;
    this.courseService
      .getCourses(this.currentPage, this.coursesPerPage)
      .subscribe((data) => {
        this.dataSource.data = data.courses;
        this.totalCourses = data.countCourses;
        this.isLoading = false;
      });
  }

  filterList(filterValue: EventTarget): void {
    this.dataSource.filter = (filterValue as HTMLTextAreaElement).value
      .trim()
      .toLocaleLowerCase();
  }

  onChangedPage(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.coursesPerPage = pageData.pageSize;
    this.courseService
      .getCourses(this.currentPage, this.coursesPerPage)
      .subscribe((data) => {
        this.dataSource.data = data.courses;
        this.totalCourses = data.countCourses;
        this.isLoading = false;
      });
  }

  deleteCourse(courseId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Conferma eliminazione',
        message: 'Sei sicuro di voler procedere con all eliminazione?',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

       this.courseService.deleteCourse(courseId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (course) => course._id !== courseId
        );

        // Update the total number of students
        this.totalCourses--;

        // If the current page has no more students after deletion, go back one page
        if (this.dataSource.data.length === 0 && this.currentPage > 0) {
          this.currentPage--;
        }

        this.loadData(); // Refresh data after deletion

        // Reload the current page of students
        this.courseService
          .getCourses(this.currentPage, this.coursesPerPage)
          .subscribe((data) => {
            this.dataSource.data = data.courses;
            this.totalCourses = data.countCourses;
            this.isLoading = false;
          });

        // Show snack bar notification
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Corso eliminato con successo',
        });
      });
    });
  }

}
