import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  constructor(private httpClient: HttpClient) {}

  public getData(paramsProvided: any) {
    let params = new HttpParams();
    Object.keys(paramsProvided).forEach(function (key) {
      params = params.append(key, paramsProvided[key]);
    });
    params = params.append('apikey', ENV.api_key);
    return this.httpClient.get<any>('http://www.omdbapi.com/', { params });
  }
}
