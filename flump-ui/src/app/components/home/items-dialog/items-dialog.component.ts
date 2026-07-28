import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InventoryService } from '../../inventory/inventory.service';
import { MsgService } from '../../../services/msg.service';
import { PathConfig } from '../../../core/config/pathConfig';
import { HttpService } from '../../../services/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-items-dialog',
  standalone: false,
  templateUrl: './items-dialog.component.html',
  styleUrl: './items-dialog.component.scss',
})
export class ItemsDialogComponent implements OnInit {
  activityItemsList: Array<any> = [];
  inventoryItemsList: Array<any> = [];
  itemsForm!: FormGroup;
  oldActivities: any = [];
  oldInventory: any = [];

  constructor(
    private inventoryService: InventoryService,
    private msgService: MsgService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<ItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initItemsForm();
    this.getActivity();
    this.fetchAllInventory();
    this.getAttendanceInventories();
  }

  initItemsForm() {
    this.itemsForm = this.formBuilder.group({
      activities: new FormControl([]),
      inventoryItems: new FormControl([]),
    });
  }

  get activitiesControl(): FormControl {
    return this.itemsForm.get('activities') as FormControl;
  }

  get inventoryControl(): FormControl {
    return this.itemsForm.get('inventoryItems') as FormControl;
  }

  fetchAllInventory() {
    this.inventoryService.getAllInventory().subscribe({
      next: (res: any) => {
        // console.log(res);

        this.inventoryItemsList = res;
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, 'Error');
      },
    });
  }

  getActivity() {
    const url = `${PathConfig.GET_ACTIVITY}`;
    this.httpService.get(url, '').subscribe({
      next: (res) => {
        this.activityItemsList = res;
      },
      error: (error) => {
        this.msgService.typeError('Failed to load activities');
      },
    });
  }

  onActivityChange(selectedActivities: any) {
    this.activitiesControl.setValue(selectedActivities);
  }

  onInventoryChange(selectedInventory: any) {
    const inventoryArray = selectedInventory.map((inventory: any) => ({
      inventoryId: inventory.id,
      name: inventory.name,
      quantity: 1,
    }));
    this.inventoryControl.setValue(inventoryArray);
  }

  updateQuantity(index: number, event: any) {
    // console.log(event.target.value, index);

    const updatedInventory = [...this.inventoryControl.value];
    updatedInventory[index].quantity = event.target.value;
    this.inventoryControl.setValue(updatedInventory);
  }

  // removeInventoryItem(index: number) {
  //   const updatedInventory = [...this.inventoryControl.value];
  //   updatedInventory.splice(index, 1);
  //   this.inventoryControl.setValue(updatedInventory);
  // }

  getAttendanceInventories() {
    this.homeService
      .getAttendanceInventoryData(this.data.attendanceId)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.oldActivities = res.activityList;
          this.oldInventory = res.inventoryList;
        },
        error: (err) => {
          this.msgService.typeError(err.error.message, 'Error');
        },
      });
  }

  saveItems() {
    const formData = this.itemsForm.value;

    formData.activities = this.processActivities(formData.activities);
    formData.inventories = this.processInventories(formData.inventoryItems);

    delete formData.inventoryItems;
    formData.userId = this.data.userId;

    this.dialogRef.close(formData);
  }

  private processActivities(newActivities: any[]): any[] {
    if (this.oldActivities.length === 0) {
      return newActivities.map((activity) => activity.id);
    }

    const oldActivityIds = this.oldActivities
      .map((oldActivity: any) => {
        const matchedActivity = this.activityItemsList.find(
          (activity) => activity.activityName === oldActivity.activityName
        );
        return matchedActivity ? matchedActivity.id : null;
      })
      .filter((id: any) => id !== null);

    return [...oldActivityIds, ...newActivities.map((activity) => activity.id)];
  }

  private processInventories(newInventoryItems: any[]): any[] {
    const newInventories = newInventoryItems.map((item) => ({
      inventoryId: item.inventoryId ?? item.id,
      quantity: item.quantity,
    }));

    if (this.oldInventory.length === 0) {
      return newInventories;
    }

    const oldInventories = this.oldInventory.map((item: any) => ({
      inventoryId: item.inventoryId,
      quantity: item.quantity,
    }));

    return [...newInventories, ...oldInventories];
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
