import themes from './themes.js';
import {generateTeam} from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';

//классы персонажей
import Bowman from './Characters/Bowman.js';
import Daemon from './Characters/Daemon.js';
import Magician from './Characters/Magician.js';
import Swordsman from './Characters/Swordsman.js';
import Undead from './Characters/Undead.js';
import Vampire from './Characters/Vampire.js';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.possiblePlayerPosition = [];
    this.possibleEnemyPosition = [];

    this.countPlayers = 3;
    this.playersMaxLevel = 1;
  }

  generatePlayerTeam(){
    const playerTeam = [];
    const team = generateTeam([Bowman, Magician, Swordsman],this.playersMaxLevel, this.countPlayers)
    for (const item of team.characters){
      playerTeam.push(new PositionedCharacter(item, this.getPlayerPositionNumber()))
    }
    return playerTeam;
  }

  generatePlayerPositionNumber(){
    let boardSize = this.gamePlay.boardSize ** 2;
    for (let i = 0; i < boardSize; i += 1){
      if (i % this.gamePlay.boardSize === 0){
        this.possiblePlayerPosition.push(i);
        this.possiblePlayerPosition.push(i + 1);
      }
    }
  }

  getPlayerPositionNumber(){
    let PositionNumber = Math.floor(Math.random() * this.possiblePlayerPosition.length);
    let playerPosition = this.possiblePlayerPosition[PositionNumber];
    this.possiblePlayerPosition.splice(PositionNumber, 1);
    return playerPosition;
  }

  generateEnemyTeam(){
    const enemyTeam = [];
    const team = generateTeam([Daemon, Undead, Vampire],this.playersMaxLevel, this.countPlayers);
    for (const item of team.characters){
      enemyTeam.push(new PositionedCharacter(item, this.getEnemyPositionNumber()))
    }
    return enemyTeam;
  }

  generateEnemyPositionNumber(){
    let boardSize = this.gamePlay.boardSize ** 2;
    for (let i = 0; i < boardSize; i += 1){
      if (i % this.gamePlay.boardSize === 6){
        this.possibleEnemyPosition.push(i);
        this.possibleEnemyPosition.push(i + 1);
      }
    }
  }

  getEnemyPositionNumber(){
    let PositionNumber = Math.floor(Math.random() * this.possibleEnemyPosition.length);
    let enemyPosition = this.possibleEnemyPosition[PositionNumber];
    this.possibleEnemyPosition.splice(PositionNumber, 1);
    return enemyPosition;
  }

  positions(){
    this.generatePlayerPositionNumber()
    this.generateEnemyPositionNumber()
    let enemy = this.generateEnemyTeam();
    let player = this.generatePlayerTeam();
    return player.concat(enemy);
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.redrawPositions(this.positions())

    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
