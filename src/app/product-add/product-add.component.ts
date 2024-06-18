import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { addProduct } from '../../store/actions/products.actions';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  public productForm: FormGroup;

  constructor(private store: Store, private router: Router, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  public ngOnInit(): void {}

  public onAdd() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        ...this.productForm.value,
        id: 0
      };

      this.store.dispatch(addProduct({ product: newProduct }));
      this.router.navigate(['/']);
    }
  }

  public onBack() {
    this.router.navigate(['/']);
  }
}

