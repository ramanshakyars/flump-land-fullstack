import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from './category.service';
import { MsgService } from '../../services/msg.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAddEditModalComponent } from './category-add-edit-modal/category-add-edit-modal.component';

@Component({
  selector: 'app-inventory-category',
  standalone: false,
  templateUrl: './inventory-category.component.html',
  styleUrl: './inventory-category.component.scss'
})
export class InventoryCategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["categoryName", "action"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  category: Array<any> = [];

  constructor(private categoryService: CategoryService, private msgService: MsgService, private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.category);
  }

  ngOnInit(): void {
    this.fetchAllCategory();
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

  fetchAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => {
        this.category = res;
        this.dataSource.data = this.category;
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this.msgService.typeSuccess("Category Deleted Successfully", "Success");
        this.fetchAllCategory();
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  openCategoryForm(action: string, editData?: any) {
    const dialogRef = this.dialog.open(CategoryAddEditModalComponent, {
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
          this.fetchAllCategory();
        }
      }
    });
  }
}

