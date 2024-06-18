import { createReducer, on, Action } from '@ngrx/store';
import * as LoaderActions from '../actions/loader.actions';

export interface LoaderState {
  loading: boolean;
}

export const initialState: LoaderState = {
  loading: false
};

export const loaderReducer = createReducer(
  initialState,
  on(LoaderActions.showLoader, state => ({ ...state, loading: true })),
  on(LoaderActions.hideLoader, state => ({ ...state, loading: false }))
);

export function reducer(state: LoaderState | undefined, action: Action) {
  return loaderReducer(state, action);
}
