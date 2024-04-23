import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLogComponent } from './attendance-log.component';

describe('AttendanceLogComponent', () => {
  let component: AttendanceLogComponent;
  let fixture: ComponentFixture<AttendanceLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
