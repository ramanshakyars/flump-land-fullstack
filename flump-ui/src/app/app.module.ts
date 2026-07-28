import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ActivityComponent } from './components/activity/activity.component';
import { InventoryCategoryComponent } from './components/inventory-category/inventory-category.component';
import { BillingComponent } from './components/billing/billing.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { ChildrenFormDialogComponent } from './components/home/children-form-dialog/children-form-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';
import { InventoryAddEditDialogComponent } from './components/inventory/inventory-add-edit-dialog/inventory-add-edit-dialog.component';
import { ValdemortModule } from 'ngx-valdemort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryAddEditModalComponent } from './components/inventory-category/category-add-edit-modal/category-add-edit-modal.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ItemsDialogComponent } from './components/home/items-dialog/items-dialog.component';
import { CreateBillComponent } from './components/billing/create-bill/create-bill.component';
import {MatCardModule} from '@angular/material/card';
import { OffersComponent } from './components/offers/offers.component';
import { OfferAddEditComponent } from './components/offers/offer-add-edit/offer-add-edit.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent,
    ActivityComponent,
    InventoryCategoryComponent,
    BillingComponent,
    ChildrenFormDialogComponent,
    InventoryAddEditDialogComponent,
    CategoryAddEditModalComponent,
    ItemsDialogComponent,
    CreateBillComponent,
    OffersComponent,
    OfferAddEditComponent,
    ViewHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    NgIf,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatListModule,
    ReactiveFormsModule,
    ValdemortModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginator
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
