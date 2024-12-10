import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModel, Customer, IJsonResponse, Login } from '../model/interface/response';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private http = inject(HttpClient);

  private baseURL: string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  getAllProducts(): Observable<IJsonResponse> {
    return this.http.get<IJsonResponse>(this.baseURL + "GetAllProducts");
  }

  GetAllCategory(): Observable<IJsonResponse> {
    return this.http.get<IJsonResponse>(this.baseURL + "GetAllCategory");
  }

  GetAllProductsByCategoryId(categoryId: number): Observable<IJsonResponse> {
    const url = `${this.baseURL}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<IJsonResponse>(url);
  }

  registerNewCustomer(customer: Customer): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}RegisterCustomer`;
    return this.http.post<IJsonResponse>(url,customer);
  }

  addToCart(cart: CartModel): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}AddToCart`;
    return this.http.post<IJsonResponse>(url,cart);
  }

  loginCustomer(login: Login): Observable<IJsonResponse> {
    debugger;
    const url = `${this.baseURL}Login`;
    return this.http.post<IJsonResponse>(url,login);
  }
}
