import { PaymentsService } from './../../shared/services/payments.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin } from 'rxjs';
import { PaymentData } from 'src/app/shared/model/response/paymentResponse.model';
import { StudentDetails } from 'src/app/shared/model/response/studentResponse.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'course', 'subscriptionDuration', 'startDate', 'endDate', 'amount', 'paymentDate', 'status'];
  dataSource: MatTableDataSource<PaymentData> = new MatTableDataSource<PaymentData>();
  totalEarned: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isLoading: boolean = false;

  constructor(private paymentsService: PaymentsService, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.paymentsService.getPayments().subscribe(paymentsResponse => {
      const payments = paymentsResponse.data.payments;

      // Assign to dataSource
      this.dataSource.data = payments;
      this.totalImportEarned();
      this.isLoading = false;
    })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  totalImportEarned() {
    this.totalEarned = this.dataSource.data.reduce((acc, el) => acc + el.subscription.amount, 0);
  }
}
