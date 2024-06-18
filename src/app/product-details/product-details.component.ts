import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { loadProducts } from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducers/product.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = { id: 0, name: '', description: '', price: 0 };
  private product$: Observable<Product | undefined>;
  private id: number;

  constructor(
    private store: Store<{ products: ProductState }>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.product$ = this.store.select(state => state.products.products.find(p => p.id === this.id));
  }

  public ngOnInit() {
    this.product$.pipe(
      map(product => {
        if (product) {
          this.product = { ...product };
        }
      })
    ).subscribe();

    this.store.dispatch(loadProducts());
  }

  public onBack() {
    this.router.navigate(['/']);
  }
}
