import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenFormDialogComponent } from './children-form-dialog.component';

describe('ChildrenFormDialogComponent', () => {
  let component: ChildrenFormDialogComponent;
  let fixture: ComponentFixture<ChildrenFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildrenFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
