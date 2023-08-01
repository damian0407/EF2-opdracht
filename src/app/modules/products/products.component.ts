import { Component } from '@angular/core';
import { Observable, interval, take } from 'rxjs';
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
  public showSunAnimation: boolean = false;

  public constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product) => {
      this.products = data.products;
    });
  }

  public toggleAccordionItem(index: number): void {
    this.isMenuOpen[index] = !this.isMenuOpen[index];
  }

  public buttonClicked(): void {
    this.startCounting();
    this.showSun();
  }

  public toggleButtonSpin(): void {
    this.spin = !this.spin;
  }

  public startCounting(): void {
    if (!this.countInProgress) {
      this.countInProgress = true;
      this.spin = !this.spin;
      this.count(1000).subscribe(() => {
        this.countInProgress = false;
        this.toggleButtonSpin();
      });
    }
  }

  public count(milliseconds: number): Observable<number> {
    //If milliseconds is 3000, the observable will return the first count after the 3 seconds.
    return interval(milliseconds).pipe(take(1));
  }

  public showSun(): void {
    this.showSunAnimation = !this.showSunAnimation;
  }
}
