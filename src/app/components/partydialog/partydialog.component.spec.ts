import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartydialogComponent } from './partydialog.component';

describe('PartydialogComponent', () => {
  let component: PartydialogComponent;
  let fixture: ComponentFixture<PartydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartydialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
