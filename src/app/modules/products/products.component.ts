import { Component } from '@angular/core';
import { Observable, interval, take, timer } from 'rxjs';
import { Product, ProductData } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: ProductData[] = [];
  public isMenuOpen: boolean[] = [];
  public spin: boolean = false;
  public countInProgress: boolean = false;

  public constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product) => {
      this.products = data.products;
    });
  }

  public toggleAccordionItem(index: number) {
    this.isMenuOpen[index] = !this.isMenuOpen[index];
  }

  public toggleSpin(): void {
    this.spin = !this.spin;
  }

  public startCounting(): void {
    if (!this.countInProgress) {
      this.countInProgress = true;
      this.spin = !this.spin;
      this.count().subscribe(() => {
        this.countInProgress = false;
        this.toggleSpin();
      });
    }
  }

  public count(): Observable<number> {
    return interval(1000).pipe(take(1));
  }
}
