import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationWeatherComponent } from './destination-weather.component';

describe('DestinationWeatherComponent', () => {
  let component: DestinationWeatherComponent;
  let fixture: ComponentFixture<DestinationWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
