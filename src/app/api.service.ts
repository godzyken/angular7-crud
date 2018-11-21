import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Produit} from './produit';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/produits';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched produits')),
        catchError(this.handleError('getProduits', []))
      );
  }

  getProduit(id: number): Observable<Produit> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Produit>(url)
      .pipe(
        tap(_ => console.log(`fetched produit id=${id}`)),
        catchError(this.handleError<Produit>(`getProduct id=${id}`))
      );
  }

  addProduit(produit): Observable<Produit> {
    return this.http.post<Produit>(apiUrl, produit, httpOptions)
      .pipe(
        tap((produit: Produit) => console.log(`àjout de produit w/ id=${produit.id}`)),
        catchError(this.handleError<Produit>('addProduit'))
      );
  }

  updateProduit(id, produit): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, produit, httpOptions)
      .pipe(
        tap(_ => console.log(`updated produit id=${id}`)),
        catchError(this.handleError<any>('updateProduit'))
      );
  }

  deleteProduit(id): Observable<Produit> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Produit>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted produit id=${id}`)),
        catchError(this.handleError<Produit>('deleteProduit'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: envoi l'erreur au remote logging
      console.error(error); // log en console

      // laisse l'application tournée en arrire plan
      return of(result as T);
    };
  }


}

