import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListingComponent } from './restaurant-listing.component';

describe('RestaurantListingComponent', () => {
  let component: RestaurantListingComponent;
  let fixture: ComponentFixture<RestaurantListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
