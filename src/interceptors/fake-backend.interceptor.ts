import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { Product } from '../app/models/product.model';

let products: Product[] = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
];

export function fakeBackendInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const { url, method, body } = req;

  return of(null).pipe(
    mergeMap(() => {

      if (url.endsWith('/api/products') && method === 'GET') {
        return of(new HttpResponse({ status: 200, body: products })).pipe(delay(500));
      }

      if (url.match(/\/api\/products\/\d+$/) && method === 'GET') {
        const id = parseInt(url.split('/').pop()!);
        const product = products.find(x => x.id === id);
        return of(new HttpResponse({ status: 200, body: product })).pipe(delay(500));
      }

      if (url.endsWith('/api/products') && method === 'POST') {
        const newProduct = { ...body, id: products.length ? Math.max(...products.map(x => x.id)) + 1 : 1 };
        products = [...products, newProduct];
        return of(new HttpResponse({ status: 200, body: newProduct })).pipe(delay(500));
      }

      if (url.match(/\/api\/products\/\d+$/) && method === 'PUT') {
        const id = parseInt(url.split('/').pop()!);
        const index = products.findIndex(x => x.id === id);
        if (index !== -1) {
          products = [
            ...products.slice(0, index),
            { ...body, id },
            ...products.slice(index + 1)
          ];
          return of(new HttpResponse({ status: 200, body: products[index] })).pipe(delay(500));
        }
      }

      if (url.match(/\/api\/products\/\d+$/) && method === 'DELETE') {
        const id = parseInt(url.split('/').pop()!);
        const index = products.findIndex(x => x.id === id);
        if (index !== -1) {
          products = products.filter(p => p.id !== id);
          return of(new HttpResponse({ status: 200 })).pipe(delay(500));
        }
      }

      return next(req);
    }),
  );
}
