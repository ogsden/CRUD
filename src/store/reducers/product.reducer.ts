import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/products.actions';
import { Product } from '../../app/models/product.model';

export interface ProductState {
  products: Product[];
  error: any;
}

export const initialState: ProductState = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({ ...state, products: [...state.products, product] })),
  on(ProductActions.addProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.updateProductSuccess, (state, { product }) => {
    const updatedProducts = state.products.map(p => p.id === product.id ? product : p);
    return { ...state, products: updatedProducts };
  }),
  on(ProductActions.updateProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => {
    const updatedProducts = state.products.filter(p => p.id !== id);
    return { ...state, products: updatedProducts };
  }),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
