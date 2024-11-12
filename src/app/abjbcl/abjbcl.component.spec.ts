import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABJBCLComponent } from './abjbcl.component';

describe('ABJBCLComponent', () => {
  let component: ABJBCLComponent;
  let fixture: ComponentFixture<ABJBCLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ABJBCLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABJBCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
