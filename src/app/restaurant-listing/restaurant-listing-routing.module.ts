import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListingComponent } from './components/restaurant-listing.component';

const routes: Routes = [
  { path: '', component: RestaurantListingComponent ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantListingRoutingModule { }
