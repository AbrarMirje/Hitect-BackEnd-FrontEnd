import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  totalCashOrders$!: Observable<number>;
  totalUpiOrders$!: Observable<number>;
  grandTotalCash$!: Observable<number>;
  grandTotalUpi$!: Observable<number>;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.totalCashOrders$ = this.service.totalCashOrders();
    this.totalUpiOrders$ = this.service.totalUpiOrders();
    this.grandTotalCash$ = this.service.cashTotal();
    this.grandTotalUpi$ = this.service.upiPayment();
  }
}
