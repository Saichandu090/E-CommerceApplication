import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartModel, Customer, IJsonResponse, Login, OrderModel } from '../model/interface/response';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private http = inject(HttpClient);

  private baseURL: string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  onCartAdded: Subject<boolean> = new Subject<boolean>();

  getAllProducts(): Observable<IJsonResponse> {
    return this.http.get<IJsonResponse>(this.baseURL + "GetAllProducts");
  }

  getAllCategory(): Observable<IJsonResponse> {
    return this.http.get<IJsonResponse>(this.baseURL + "GetAllCategory");
  }

  getAllProductsByCategoryId(categoryId: number): Observable<IJsonResponse> {
    const url = `${this.baseURL}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<IJsonResponse>(url);
  }

  getCartProductsByCustomerId(customerId: number): Observable<IJsonResponse> {
    const url = `${this.baseURL}GetCartProductsByCustomerId?id=${customerId}`;
    return this.http.get<IJsonResponse>(url);
  }

  deleteProductFromCartById(cartId: number): Observable<IJsonResponse> {
    const url = `${this.baseURL}DeleteProductFromCartById?id=${cartId}`;
    return this.http.get<IJsonResponse>(url);
  }

  registerNewCustomer(customer: Customer): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}RegisterCustomer`;
    return this.http.post<IJsonResponse>(url, customer);
  }

  addToCart(cart: CartModel): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}AddToCart`;
    return this.http.post<IJsonResponse>(url, cart);
  }

  loginCustomer(login: Login): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}Login`;
    return this.http.post<IJsonResponse>(url, login);
  }

  placeOrder(obj: OrderModel): Observable<IJsonResponse> {
    const url = `${this.baseURL}PlaceOrder`;
    return this.http.post<IJsonResponse>(url,obj);
  }

  loggedInUser: Customer = new Customer();

  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_LEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedInUser = parseObj;
    }
  }
}
