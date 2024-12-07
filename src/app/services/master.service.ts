import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJsonResponse } from '../model/interface/response';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private http = inject(HttpClient);

  private baseURL: string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  getAllProducts(): Observable<IJsonResponse> {
    return this.http.get<IJsonResponse>(this.baseURL + "GetAllProducts");
  }
}
