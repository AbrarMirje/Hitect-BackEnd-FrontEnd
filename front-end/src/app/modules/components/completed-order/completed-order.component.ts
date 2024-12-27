import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

export interface ProductsElements {
  billNumber: number;
  itemName: string;
  quantity: number;
  orderStatus: string;
  toppingName: number;
  toppingId: number;
}
@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrl: './completed-order.component.css',
})
export class CompletedOrderComponent {
  displayedColumns: string[] = [
    'billNumber',
    'itemName',
    'quantity',
    'orderStatus',
    'toppingName',
  ];

  dataSource = new MatTableDataSource<ProductsElements>([]);
  form!: FormGroup;

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
