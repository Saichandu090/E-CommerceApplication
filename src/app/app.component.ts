import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Customer, ICart, IJsonResponse, Login } from './model/interface/response';
import { FormsModule } from '@angular/forms';
import { MasterService } from './services/master.service';
import { Constant } from './constant/constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  @ViewChild("registerModel") registerModel: ElementRef | undefined;

  @ViewChild("loginModel") loginModel: ElementRef | undefined;

  openRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "block"
    }
  }

  closeRegisterModel() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "none"
    }
  }

  registerObj:Customer=new Customer();

  masterService=inject(MasterService);

  onRegister(){
    debugger;
    this.masterService.registerNewCustomer(this.registerObj).subscribe((res:IJsonResponse)=>{
      if(res.result){
        alert("Registration Success")
        this.closeRegisterModel()
      }else{
        alert(res.message)
      }
    })
  }
  //=========================================//

  openLoginModel(){
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = "block"
    }
  }

  closeLoginModel() {
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = "none"
    }
  }

  loginObj:Login=new Login();

  loggedInUser:Customer=new Customer();

  ngOnInit(): void {
    const isUser=localStorage.getItem(Constant.LOCAL_LEY);
    if(isUser !=null){
      const parseObj=JSON.parse(isUser);
      this.loggedInUser=parseObj; 
      this.getCartItems();
    }
    this.masterService.onCartAdded.subscribe((res:boolean)=>{
      if(res){
        this.getCartItems()
      }
    })
  }

  

  onLogin(){
    this.masterService.loginCustomer(this.loginObj).subscribe((res:IJsonResponse)=>{
      if(res.result){
        this.loggedInUser=res.data;
        alert("Login Success")
        localStorage.setItem(Constant.LOCAL_LEY,JSON.stringify(res.data))
        this.closeLoginModel()
      }else{
        alert(res.message)
      }
    })
  }

  onLogOut(){
    localStorage.removeItem(Constant.LOCAL_LEY);
    this.loggedInUser=new Customer();
  }

  //=====================================//

  isPopUpOpen:boolean=true;

  showCartPopUp(){
    this.isPopUpOpen=!this.isPopUpOpen
  }

  //====================================//

  cartData:ICart[]=[];

  getCartItems(){
    this.masterService.getCartProductsByCustomerId(this.loggedInUser.custId).subscribe((res:IJsonResponse)=>{
      if(res.result){
        this.cartData=res.data
      }
    })
  }

  onRemoveProduct(id:number){
    this.masterService.deleteProductFromCartById(id).subscribe((res:IJsonResponse)=>{
      if(res.result){
        alert("Product removed from cart");
        this.getCartItems();
      }else{
        alert(res.message)
      }
    })
  }

}
