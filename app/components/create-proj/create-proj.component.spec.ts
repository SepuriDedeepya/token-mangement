import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjComponent } from './create-proj.component';

describe('CreateProjComponent', () => {
  let component: CreateProjComponent;
  let fixture: ComponentFixture<CreateProjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjComponent]
    });
    fixture = TestBed.createComponent(CreateProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
