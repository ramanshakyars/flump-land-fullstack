import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { PathConfig } from '../../../core/config/pathConfig';
import { MatTableDataSource } from '@angular/material/table';
import { OffersService } from '../../offers/offers.service';
import { MsgService } from '../../../services/msg.service';

@Component({
  selector: 'app-create-bill',
  standalone: false,
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.scss',
})
export class CreateBillComponent implements OnInit {
  attendanceId!: string; // Store the attendanceId
  totalAmount: any;
  attendanceDocument: any;
  paymentMethod: string[] = ['CASH', 'ONLINE'];
  paymentMode: any;
  offers: any;

  displayedColumns1: string[] = [
    'S.No',
    'name',
    'price',
    'quantity',
    'total Price',
  ];
  displayedColumns2: string[] = ['S.No', 'name', 'price'];
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  activeOffers: any[] = [];
  discountedAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private offersService: OffersService,
    private msgService: MsgService
  ) { }
  ngOnInit(): void {
    this.attendanceId = this.route.snapshot.paramMap.get('id') || '';
    this.getAttendanceById();
    this.fetchAllOffers();
    this.filterActiveOffers();

  }

  getAttendanceById() {
    const url = `${PathConfig.GET_ATTENDANCE_BY_ID}/${this.attendanceId}`;
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.attendanceDocument = res;
        this.totalAmount = this.totalAmount =
          res.activities.reduce((sum: any, item: any) => sum + item.price, 0) +
          res.inventories.reduce(
            (sum: any, item: any) => sum + item.totalAmount,
            0
          );
        console.log(this.totalAmount);

        this.dataSource1 = new MatTableDataSource(res.inventories);
        this.dataSource2 = new MatTableDataSource(res.activities);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPaymentModeChange(event: any) {
    this.paymentMode = event;
    console.log(this.paymentMode);
  }

  createBill() {
    if (this.discountedAmount > 0) {
      this.totalAmount = this.discountedAmount
    }
    const formData = {
      activities: this.attendanceDocument.activities,
      inventories: this.attendanceDocument.inventories,
      totalAmount: this.totalAmount,
      userId: this.attendanceDocument.userId,
      paymentMode: this.paymentMode,
    };
    this.httpService.post(PathConfig.CREATE_BILL, formData).subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Bill created successfully');
        this.router.navigate(['billing']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res: any) => {
        this.offers = res;
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  filterActiveOffers() {
    const today = new Date();
    this.activeOffers = this.offers.filter((offer: any) => {
      const startDate = new Date(offer.start);
      const endDate = new Date(offer.end);
      return offer.isActive && today >= startDate && today <= endDate;
    });
  }

  onOfferSelect(selectedOffer: any) {
    if (selectedOffer) {
      const discount = (this.totalAmount * selectedOffer.percentage) / 100;
      this.discountedAmount = this.totalAmount - discount;
      console.log(`Discounted Amount: ${this.discountedAmount}`);
    } else {
      this.discountedAmount = this.totalAmount;
    }
  }

}
