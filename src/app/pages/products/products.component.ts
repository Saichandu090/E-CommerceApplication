import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CartModel, Customer, ICategory, IJsonResponse, IProduct } from '../../model/interface/response';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  private masterService: MasterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    )
  }

  //productList:IProduct[]=[];

  productList = signal<IProduct[]>([]);

  categoryList$: Observable<ICategory[]> = new Observable<ICategory[]>();
  subscriptionList: Subscription[] = [];

  //=============================================//

  loadAllProducts() {
    this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res: IJsonResponse) => {
      if (res.result) {
        this.productList.set(res.data);
      }
    }))
  }

  //=============================================//

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe()
    })
  }

  //==============================================//

  getProductByCategoryId(categoryId: number) {
    this.masterService.getAllProductsByCategoryId(categoryId).subscribe((res: IJsonResponse) => {
      this.productList.set(res.data);
    })
  }

  //================================================//

  loggedInUser: Customer = new Customer();

  constructor() {
    this.loggedInUser=this.masterService.loggedInUser; // reusing the same user from master service making use of everywhere
  }


  onAddToCart(id: number) {
    debugger;
    const newObj: CartModel = new CartModel();
    newObj.ProductId = id;
    newObj.CustId = this.loggedInUser.custId;
    this.masterService.addToCart(newObj).subscribe((res:IJsonResponse)=>{
      if(res.result){
        alert("Product added to Cart")
        this.masterService.onCartAdded.next(true) // emitting the subject and this subject should be subscribed in app component
      }else{
        alert(res.message)
      }
    })
  }
}
