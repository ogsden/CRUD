import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { updateProduct, loadProducts } from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducers/product.reducer';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public productForm: FormGroup;
  private product$: Observable<Product | undefined>;
  private id: number;

  constructor(
    private store: Store<{ products: ProductState }>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.product$ = this.store.select(state => state.products.products.find(p => p.id === this.id));

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  public ngOnInit() {
    this.product$.pipe(
      map(product => {
        if (product) {
          this.productForm.patchValue(product);
        }
      })
    ).subscribe();

    this.store.dispatch(loadProducts());
  }

  public onSave() {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.productForm.value,
        id: this.id
      };

      this.store.dispatch(updateProduct({ product: updatedProduct }));
      this.router.navigate(['/']);
    }
  }

  public onBack() {
    this.router.navigate(['/'])
  }
}
