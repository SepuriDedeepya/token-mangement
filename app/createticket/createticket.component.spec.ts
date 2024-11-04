import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateticketComponent } from './createticket.component';

describe('CreateticketComponent', () => {
  let component: CreateticketComponent;
  let fixture: ComponentFixture<CreateticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateticketComponent]
    });
    fixture = TestBed.createComponent(CreateticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
