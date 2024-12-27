import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { jsPDF } from 'jspdf'; // Import jsPDF for generating PDF
import autoTable from 'jspdf-autotable';

export interface ProductsElements {
  billNumber: number;
  itemName: string;
  quantity: number;
  subTotal: number;
  extraCharges: number;
  parcelCharges: number;
  finalTotal: number;
  paymentMode: string;
}

@Component({
  selector: 'app-counter-order',
  templateUrl: './counter-order.component.html',
  styleUrls: ['./counter-order.component.css'],
  providers: [DatePipe],
})
export class CounterOrderComponent implements OnInit {
  displayedColumns: string[] = [
    'billNumber',
    'itemName',
    'quantity',
    'subTotal',
    'extraCharges',
    'parcelCharges',
    'finalTotal',
    'paymentMode',
  ];
  dataSource = new MatTableDataSource<ProductsElements>([]);
  form!: FormGroup;
  paymentMode: string = ''; // Track the payment mode
  totalFinalAmount: number = 0; // Variable to store the total final amount

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Set payment mode when button is clicked
  setPaymentMode(mode: string) {
    this.paymentMode = mode;
  }

  // Transform form data for backend request
  transformPurchaseData() {
    const { startDate, endDate } = this.form.value;

    const transformedData = {
      startDate: this.datePipe.transform(startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd'),
      purchaseProducts: this.dataSource.data,
    };

    return transformedData;
  }

  // Fetch data when sale is submitted
  onSubmitSale() {
    if (this.form.valid) {
      const transformedData = this.transformPurchaseData();

      if (this.paymentMode === 'cash') {
        this.service.salecashdatereports(transformedData).subscribe(
          (data: ProductsElements[]) => {
            this.dataSource.data = data;
            this.calculateTotalFinalAmount();
          },
          (error) => this.toast.error('Error fetching Cash reports.')
        );
      } else if (this.paymentMode === 'upi') {
        this.service.saleupidatereports(transformedData).subscribe(
          (data: ProductsElements[]) => {
            this.dataSource.data = data;
            this.calculateTotalFinalAmount();
          },
          (error) => this.toast.error('Error fetching UPI reports.')
        );
      } else {
        this.toast.error('Please select a payment mode.');
      }
    } else {
      this.toast.error('Please fill out both dates.');
    }
  }

  // Apply filter for the search input in the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Calculate the dynamic sum of finalTotal
  calculateTotalFinalAmount() {
    this.totalFinalAmount = this.dataSource.data.reduce(
      (sum, item) => sum + item.finalTotal,
      0
    );
  }

  // Download the report as a PDF file
  downloadPDF() {
    const doc = new jsPDF();
    const tableColumn = [
      'Bill Number',
      'Item Name',
      'Quantity',
      'Sub Total',
      'Extra Charges',
      'Parcel Charges',
      'Final Total',
      'Payment Mode',
    ];
    const tableRows: any = [];

    // Loop through the data to create rows for the PDF
    this.dataSource.data.forEach((element) => {
      const rowData = [
        element.billNumber,
        element.itemName,
        element.quantity,
        element.subTotal,
        element.extraCharges,
        element.parcelCharges,
        element.finalTotal,
        element.paymentMode,
      ];
      tableRows.push(rowData);
    });

    // Generate the table in PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text('Sale Report', 14, 15);
    doc.save('sale_report.pdf');
  }

  // Print the current view of the table
  // Custom print functionality
  printReport() {
    const printContent = document.getElementById('printableArea')!.innerHTML;
    const win = window.open('', '', 'height=700,width=800');
    win!.document.write(`
      <html>
        <head>
          <title>Sale Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <table>
           
            <tbody>
              ${printContent}
            </tbody>
          </table>
        </body>
      </html>
    `);
    win!.document.close();
    win!.window.print();
  }
}
