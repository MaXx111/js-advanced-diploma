import themes from './themes.js';

export default class GameState {
  constructor() {
    this.gameLevelCount = 1;
    this.stopGameFlag = false;
    this.themesDraw = themes.prairie;

    this.possiblePlayerPosition = [];
    this.possibleEnemyPosition = [];
    this.teamOnBoard = [];

    this.activeCharacter = false;
    this.isActive = false;
    this.validMove = [];
    this.validAttack = [];

    this.countPlayers = 3;
    this.playersMaxLevel = 1;
  }

  static from(object) {
    // TODO: create object
    if (typeof object === 'object') {
      return object;
    }
    return null;
  }
}
