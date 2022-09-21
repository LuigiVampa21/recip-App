import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwbComponent } from './twb.component';

describe('TwbComponent', () => {
  let component: TwbComponent;
  let fixture: ComponentFixture<TwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
