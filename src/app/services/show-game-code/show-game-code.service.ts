import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

export enum APIEndPOint {
  WIN_GAME = "/game/win-game",
  LOOSE_GAME = "/game/loose-game",
  CANCEL = "/game/cancel-game",
}

@Injectable({
  providedIn: 'root'
})
export class ShowGameCodeService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  wingame(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.WIN_GAME, payload);
  }

  loosegame(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.LOOSE_GAME, payload);
  }

  cancel(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.CANCEL, payload);
  }



}
