import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../store/reducers/loader.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  public loading$: Observable<boolean>;

  constructor(private store: Store<{ loader: LoaderState }>) {
    this.loading$ = this.store.select(state => state.loader.loading);
  }
}
