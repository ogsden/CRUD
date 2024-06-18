import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { ProductEffects } from './store/effects/product.effects';
import { routes } from './app/app.routes';
import { productReducer } from './store/reducers/product.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { loaderReducer } from './store/reducers/loader.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([fakeBackendInterceptor])),
    provideStore({ 
      products: productReducer,
      loader: loaderReducer
    }),
    provideEffects([ProductEffects]),
    provideRouter(routes),
    ReactiveFormsModule
  ]
});

