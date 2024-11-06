import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order-service';
import { OrderDTO } from '../models/OrderDTO';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderSummary?: OrderDTO;
  obj: any;
  total?: number;
  showDialog: boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.orderSummary = this.obj;

    if (this.orderSummary?.foodItemList) {
      this.total = this.orderSummary.foodItemList.reduce((accumulator, currentValue) => {
        const quantity = currentValue.quantity ?? 0; // Default to 0 if undefined
        const price = currentValue.price ?? 0;       // Default to 0 if undefined
        return accumulator + (quantity * price);
      }, 0);
    }
  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe(
      response => {
        this.showDialog = true;
      },
      error => {
        console.error('Failed to save data:', error);
      }
    );
  }

  closeDialog(){
    this.showDialog = false;
    this.router.navigate(['/']);
  }

}
