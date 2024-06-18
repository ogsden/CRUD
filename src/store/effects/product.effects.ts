import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/products.actions';
import * as LoaderActions from '../actions/loader.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../app/services/product.service';
import { Store } from '@ngrx/store';
import { Product } from '../../app/models/product.model';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      tap(() => this.store.dispatch(LoaderActions.showLoader())),
      mergeMap(() => this.productService.getProducts().pipe(
        map((products: Product[]) => ProductActions.loadProductsSuccess({ products })),
        catchError((error: any) => of(ProductActions.loadProductsFailure({ error })))
      )),
      tap(() => this.store.dispatch(LoaderActions.hideLoader()))
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      tap(() => this.store.dispatch(LoaderActions.showLoader())),
      mergeMap(action => this.productService.createProduct(action.product).pipe(
        map((product: Product) => ProductActions.addProductSuccess({ product })),
        catchError((error: any) => of(ProductActions.addProductFailure({ error })))
      )),
      tap(() => this.store.dispatch(LoaderActions.hideLoader()))
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      tap(() => this.store.dispatch(LoaderActions.showLoader())),
      mergeMap(action => this.productService.updateProduct(action.product).pipe(
        map((product: Product) => ProductActions.updateProductSuccess({ product })),
        catchError((error: any) => of(ProductActions.updateProductFailure({ error })))
      )),
      tap(() => this.store.dispatch(LoaderActions.hideLoader()))
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      tap(() => this.store.dispatch(LoaderActions.showLoader())),
      mergeMap(action => this.productService.deleteProduct(action.id).pipe(
        map(() => ProductActions.deleteProductSuccess({ id: action.id })),
        catchError((error: any) => of(ProductActions.deleteProductFailure({ error })))
      )),
      tap(() => this.store.dispatch(LoaderActions.hideLoader()))
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store
  ) {}
}
