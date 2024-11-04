import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprojectmanagerdetailsComponent } from './showprojectmanagerdetails.component';

describe('ShowprojectmanagerdetailsComponent', () => {
  let component: ShowprojectmanagerdetailsComponent;
  let fixture: ComponentFixture<ShowprojectmanagerdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowprojectmanagerdetailsComponent]
    });
    fixture = TestBed.createComponent(ShowprojectmanagerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
