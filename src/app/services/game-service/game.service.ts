import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SUCCESS } from 'src/app/pages/constant/response-status.const';

export enum APIEndPOint {
  CREATE_BATTLE = "/game/get-game-code",
  PLAY_GAME = "/game/pay-game",
  GET_GAME_HISTORY = "/game/get-battle-list",
  GET_SINGLE_BATTLE = '/game/get-game-table/BATTLEIID',
  GET_USER_GAME_HISTORY = '/game/get-game-history'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl!: string;

  private battleList = new BehaviorSubject<any>([]);
  gameBattleList$ = this.battleList.asObservable();

  private requestBattleList = new BehaviorSubject<any>([]);
  requestBattleList$ = this.requestBattleList.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // create game table or battle
  createGameTable(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.CREATE_BATTLE, payload);
  }

  //  get game history or get battle details
  getBattleList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.GET_GAME_HISTORY);
  }

  //  get game history or get battle details
  getAndSetBattleList(): any {
    this.httpClient.get<any>(this.baseUrl + APIEndPOint.GET_GAME_HISTORY).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.setBattleList(response?.payload?.data);
      }
    });
  }

  // get single game details
  getBattleById(battleId: string): Observable<any> {
    const battleAPI: string = APIEndPOint.GET_SINGLE_BATTLE.replace('BATTLEIID', battleId);
    return this.httpClient
      .get<any>(this.baseUrl + battleAPI);
  }

  // create game table or battle
  playGame(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.PLAY_GAME, payload);
  }

  setBattleList(list: any) {
    this.battleList.next(list?.gameList);
    this.requestBattleList.next(list?.runningGameList);
  }

  //  get game history for particular player or user
  getGameHistoryForUser(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.GET_USER_GAME_HISTORY);
  }
}
