import { Component, Input } from '@angular/core';
import { IOrder } from '../../../../../interfaces/order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent{
  @Input()
  id!:string

  order!:IOrder

  constructor(
    private _service: OrderService  
  ){}

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(data => {
      this.order = data
    })
  }
}
