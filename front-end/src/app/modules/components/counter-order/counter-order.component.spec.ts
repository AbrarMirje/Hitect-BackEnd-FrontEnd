import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOrderComponent } from './counter-order.component';

describe('CounterOrderComponent', () => {
  let component: CounterOrderComponent;
  let fixture: ComponentFixture<CounterOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
