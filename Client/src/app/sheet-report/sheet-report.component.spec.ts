import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetReportComponent } from './sheet-report.component';

describe('SheetReportComponent', () => {
  let component: SheetReportComponent;
  let fixture: ComponentFixture<SheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheetReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
