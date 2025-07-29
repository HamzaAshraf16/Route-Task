import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 constructor() {}

  private _HttpClient=inject(HttpClient)

  getProduct():Observable<IProduct[]>{
    return this._HttpClient.get<IProduct[]>('https://fakestoreapi.com/products')
  }
  getProductDetails(id:number):Observable<IProduct>{
        return this._HttpClient.get<IProduct>(`https://fakestoreapi.com/products/${id}`)
  }

}
