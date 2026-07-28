import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UI';
  isCollapsed = false;

  menuItems = [
    { name: 'Home', icon: 'fas fa-home', path: "" },
    { name: 'Billing', icon: 'fas fa-file-invoice-dollar', path: "billing" },  
    { name: 'Activity', icon: 'fas fa-tasks', path: "activity" },  
    { name: 'Offers', icon: 'fas fa-layer-group', path: "offers" },  
    { name: 'Inventory', icon: 'fas fa-boxes', path: "inventory" }, 
    { name: 'Inventory Category', icon: 'fas fa-layer-group', path: "inventory-category" } , 
  ];
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
