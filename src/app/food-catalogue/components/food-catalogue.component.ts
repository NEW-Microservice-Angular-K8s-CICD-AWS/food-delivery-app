import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from 'src/app/Shared/models/FoodCataloguePage';
import { FoodItem } from 'src/app/Shared/models/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent implements OnInit {

  restaurantId: number;
  foodItemResponse: FoodCataloguePage | undefined; // Initialize as undefined
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage | undefined;

  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.restaurantId = idParam ? +idParam : 0; // Default to 0 or handle as needed
      if (this.restaurantId) {
        this.getFoodItemsByRestaurant(this.restaurantId);
      }
    });
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data;
      },
      error => {
        console.error('Error fetching food items', error);
        // Handle the error as needed
      }
    );
  }

  increment(food: FoodItem) {
    if (food) {
      // Ensure quantity is a number
      food.quantity = (food.quantity ?? 0) + 1; // Default to 0 if undefined
      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (index === -1) {
        this.foodItemCart.push(food);
      } else {
        this.foodItemCart[index] = food;
      }
    }
  }

  decrement(food: FoodItem) {
    if (food) {
      // Ensure quantity is a number and greater than 0
      if ((food.quantity ?? 0) > 0) {
        food.quantity = (food.quantity ?? 0) - 1; // Default to 0 if undefined
        const index = this.foodItemCart.findIndex(item => item.id === food.id);
        if (this.foodItemCart[index].quantity === 0) {
          this.foodItemCart.splice(index, 1);
        } else {
          this.foodItemCart[index] = food;
        }
      }
    }
  }

  onCheckOut() {
    if (this.foodItemResponse) {
      this.orderSummary = {
        foodItemList: this.foodItemCart,
        restaurant: this.foodItemResponse.restaurant
      };

      this.router.navigate(['/orderSummary'], {
        queryParams: {
          data: JSON.stringify(this.orderSummary)
        }
      });
    }
  }
}
