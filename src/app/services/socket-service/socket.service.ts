import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { GameService } from '../game-service/game.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private gameService : GameService
  ) { }

  // initialize the socket
  socketInitialize(): void {
    const url = environment.baseUrl
    const socket = io.connect(url);

    // Practice assign notification
    socket.on('create_battle', (response: any) => {
      this.gameService.getAndSetBattleList();
    });

    // Practice assign notification
    socket.on('play_game', (response: any) => {
      this.gameService.getAndSetBattleList();
    });

    // Practice assign notification
    socket.on('generate_game_code', (response: any) => {
      this.gameService.getBattleByIdSocket(response?.data?.game_table_id);
      console.log('responseresponse', response?.data?.game_table_id);
    });
  }
}
