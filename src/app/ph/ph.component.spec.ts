import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHComponent } from './ph.component';

describe('PHComponent', () => {
  let component: PHComponent;
  let fixture: ComponentFixture<PHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PHComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
