import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IJsonResponse, IProduct } from '../../model/interface/response';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private masterService: MasterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllProducts();
  }

  //productList:IProduct[]=[];

  productList = signal<IProduct[]>([]);

  //=============================================//

  loadAllProducts() {
    this.masterService.getAllProducts().subscribe((res: IJsonResponse) => {
      if (res.result) {
        this.productList.set(res.data);
      }
    })
  }

  //=============================================//

}
