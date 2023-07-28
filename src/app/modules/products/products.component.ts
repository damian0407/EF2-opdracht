import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductData } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: ProductData[] = [];
  isMenuOpen: boolean[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product) => {
      this.products = data.products;
    });
  }

  toggleAccordionItem(index: number) {
    this.isMenuOpen[index] = !this.isMenuOpen[index];
  }
}
