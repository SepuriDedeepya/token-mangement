import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallprojectComponent } from './showallproject.component';

describe('ShowallprojectComponent', () => {
  let component: ShowallprojectComponent;
  let fixture: ComponentFixture<ShowallprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowallprojectComponent]
    });
    fixture = TestBed.createComponent(ShowallprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
