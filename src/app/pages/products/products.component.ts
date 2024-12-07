import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ICategory, IJsonResponse, IProduct } from '../../model/interface/response';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit ,OnDestroy{

  private masterService: MasterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$=this.masterService.GetAllCategory().pipe(
      map(item=>item.data)
    )
  }

  //productList:IProduct[]=[];

  productList = signal<IProduct[]>([]);

  categoryList$: Observable<ICategory[]> = new Observable<ICategory[]>();
  subscriptionList:Subscription[]=[];

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
      this.subscriptionList.forEach(element=>{
        element.unsubscribe()
      })
  }
}
