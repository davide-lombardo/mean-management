import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { StudentDetails } from 'src/app/shared/model/response/studentResponse.model';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent {
  public isLoading: boolean = false;
  public displayedColumns: string[] = [
    'name',
    'surname',
    'birth',
    'subscriptionDuration',
    'course',
    'subscriptionExpires',
    'status',
    'actions',
  ];
  public dataSource: MatTableDataSource<StudentDetails> = new MatTableDataSource<StudentDetails>();
  public totalStudents: number = 0;
  public studentsPerPage: number = 5;
  public currentPage: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentsService: StudentsService,
    private paymentsService: PaymentsService,
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
    this.studentsService
      .getStudents(this.currentPage, this.studentsPerPage)
      .subscribe((data) => {
        this.dataSource.data = data.students;
        this.totalStudents = data.countStudents;
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
    this.studentsPerPage = pageData.pageSize;
    this.studentsService
      .getStudents(this.currentPage, this.studentsPerPage)
      .subscribe((data) => {
        this.dataSource.data = data.students;
        this.totalStudents = data.countStudents;
        this.isLoading = false;
      });
  }

  deleteStudent(studentId: string): void {
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

       this.studentsService.deleteStudent(studentId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (student) => student._id !== studentId
        );

        // Update the total number of students
        this.totalStudents--;

        // If the current page has no more students after deletion, go back one page
        if (this.dataSource.data.length === 0 && this.currentPage > 0) {
          this.currentPage--;
        }

        this.loadData(); // Refresh data after deletion

        // Reload the current page of students
        this.studentsService
          .getStudents(this.currentPage, this.studentsPerPage)
          .subscribe((data) => {
            this.dataSource.data = data.students;
            this.totalStudents = data.countStudents;
            this.isLoading = false;
          });

        // Show snack bar notification
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Studente eliminato con successo',
        });
      });
    });
  }

  addPayment(studentId: string): void {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   data: {
    //     title: 'Conferma pagamento',
    //     message: 'Sei sicuro di voler registrare il pagamento dello studente?',
    //   },
    //   autoFocus: false,
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) {
    //     return;
    //   }
    //   this.paymentsService.addPayment(studentId).subscribe((el) => {
    //     this.router.navigate(['/list-payment']);
    //     this._snackBar.openFromComponent(CustomSnackBarComponent, {
    //       duration: 3000,
    //       data: 'Pagamento registrato con successo',
    //     });
    //   });
    // });
  }
}
