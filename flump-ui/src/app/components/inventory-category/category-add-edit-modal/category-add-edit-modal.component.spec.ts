import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddEditModalComponent } from './category-add-edit-modal.component';

describe('CategoryAddEditModalComponent', () => {
  let component: CategoryAddEditModalComponent;
  let fixture: ComponentFixture<CategoryAddEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryAddEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
