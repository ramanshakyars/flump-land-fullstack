import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BillingComponent } from './components/billing/billing.component';
import { ActivityComponent } from './components/activity/activity.component';
import { InventoryCategoryComponent } from './components/inventory-category/inventory-category.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CreateBillComponent } from './components/billing/create-bill/create-bill.component';
import { OffersComponent } from './components/offers/offers.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'inventory-category', component: InventoryCategoryComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'create-bill/:id', component: CreateBillComponent },
  { path:  'view-history/:id', component: ViewHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
