import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallticketsComponent } from './showalltickets.component';

describe('ShowallticketsComponent', () => {
  let component: ShowallticketsComponent;
  let fixture: ComponentFixture<ShowallticketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowallticketsComponent]
    });
    fixture = TestBed.createComponent(ShowallticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
