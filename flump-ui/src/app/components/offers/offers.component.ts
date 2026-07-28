import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MsgService } from '../../services/msg.service';
import { MatDialog } from '@angular/material/dialog';
import { OfferAddEditComponent } from './offer-add-edit/offer-add-edit.component';
import { OffersService } from './offers.service';


@Component({
  selector: 'app-offers',
  standalone: false,
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent {
  displayedColumns: string[] = ["offerName", "Percentage","Start Date","End Date","Status","action"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  offers: Array<any> = [];
 
   constructor(
    private offersService: OffersService, 
    private msgService: MsgService,
    private dialog: MatDialog,
   ) {
     this.dataSource = new MatTableDataSource(this.offers);
   }
 
   ngOnInit(): void {
     this.fetchAllOffers();
   }
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
 
   fetchAllOffers() {
     this.offersService.getOffers().subscribe({
       next: (res: any) => {
         this.offers = res;
         this.dataSource.data = this.offers;
       },
       error: (err) => {
         this.msgService.typeError(err.error.message, "Error");
       }
     });
   }
 
   deleteCategory(id: string) {
     this.offersService.deleteOffersDetails(id).subscribe({
       next: (res) => {
         this.msgService.typeSuccess("Offers Deleted Successfully", "Success");
         this.fetchAllOffers();
       },
       error: (err) => {
         this.msgService.typeError(err.error.message, "Error");
       }
     });
   }
 
   openCategoryForm(action: string, editData?: any) {
     const dialogRef = this.dialog.open(OfferAddEditComponent, {
       data: {
         action: action,
         editData: editData,
       },
       width: '30%',
       disableClose: true,
       autoFocus: false,
     });
 
     dialogRef.afterClosed().subscribe({
       next: (result) => {
         if (result.refresh) {
           this.fetchAllOffers();
         }
       }
     });
   }
}
