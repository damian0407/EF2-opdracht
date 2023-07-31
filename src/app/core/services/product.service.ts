import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductData } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsUrl: string = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product> {
    return this.http.get<Product>(this.productsUrl);
  }
}
