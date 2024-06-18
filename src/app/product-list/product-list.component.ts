import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { loadProducts, deleteProduct } from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducers/product.reducer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private store: Store<{ products: ProductState }>) {
    this.products$ = this.store.select(state => state.products.products);
  }

  public ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  public onDelete(id: number) {
    this.store.dispatch(deleteProduct({ id }));
  }
}
