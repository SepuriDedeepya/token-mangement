import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterloginComponent } from './testerlogin.component';

describe('TesterloginComponent', () => {
  let component: TesterloginComponent;
  let fixture: ComponentFixture<TesterloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesterloginComponent]
    });
    fixture = TestBed.createComponent(TesterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
