import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ICart, IJsonResponse } from '../../model/interface/response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderModel } from '../../model/class/response';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit{

  masterService=inject(MasterService);
  cartData:ICart[]=[];
  totalAmount:number=0;
  orderObj:OrderModel=new OrderModel();

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems(){
    this.masterService.getCartProductsByCustomerId(this.masterService.loggedInUser.custId).subscribe((res:IJsonResponse)=>{
      this.cartData=res.data
      this.cartData.forEach(element => {
        this.totalAmount=this.totalAmount+element.productPrice;
      });
    })
  }

  onPlaceOrder(){
    this.orderObj.CustId=this.masterService.loggedInUser.custId;
    this.orderObj.TotalInvoiceAmount=this.totalAmount;
    this.masterService.placeOrder(this.orderObj).subscribe((res:IJsonResponse)=>{
      if(res.result){
        alert("Order Placed Successfully");
        this.getAllCartItems();
        this.orderObj=new OrderModel();
        this.totalAmount=0;
      }else{
        alert(res.message)
      }
    })
  }
}
