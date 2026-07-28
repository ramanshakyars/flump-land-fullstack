import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MsgService } from '../../services/msg.service';
import { InventoryService } from './inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { InventoryAddEditDialogComponent } from './inventory-add-edit-dialog/inventory-add-edit-dialog.component';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'totalQuantity', "inventoryType", "action"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  inventory: Array<any> = [];

  constructor(private inventoryService: InventoryService, private msgService: MsgService, private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.inventory);
  }

  ngOnInit(): void {
    this.fetchAllInventory();
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

  fetchAllInventory() {
    this.inventoryService.getAllInventory().subscribe({
      next: (res: any) => {
        this.inventory = res;
        this.dataSource.data = this.inventory;
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  deleteInventory(id: string) {
    this.inventoryService.deleteInventory(id).subscribe({
      next: (res) => {
        this.msgService.typeSuccess("Inventory Deleted Successfully", "Success");
        this.fetchAllInventory();
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  openInventoryForm(action: string, editData?: any) {
    const dialogRef = this.dialog.open(InventoryAddEditDialogComponent, {
      data: {
        action: action,
        editData: editData,
      },
      width: '45%',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result.refresh) {
          this.fetchAllInventory();
        }
      }
    });
  }
}
