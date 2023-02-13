import themes from './themes.js';
import { generateTeam } from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';
import GamePlay from './GamePlay.js';
import GameState from './GameState.js';
import cursors from './cursors.js';

// классы персонажей
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
    this.gameState = new GameState();
  }

  generatePlayerTeam() {
    const playerTeam = [];
    const team = generateTeam(
      [Bowman, Magician, Swordsman],
      this.gameState.playersMaxLevel,
      this.gameState.countPlayers,
    );
    for (const item of team.characters) {
      playerTeam.push(new PositionedCharacter(item, this.getPlayerPositionNumber()));
    }
    return playerTeam;
  }

  generatePlayerPositionNumber() {
    this.gameState.possiblePlayerPosition = [];
    const boardSize = this.gamePlay.boardSize ** 2;
    for (let i = 0; i < boardSize; i += 1) {
      if (i % this.gamePlay.boardSize === 0) {
        this.gameState.possiblePlayerPosition.push(i);
        this.gameState.possiblePlayerPosition.push(i + 1);
      }
    }
  }

  getPlayerPositionNumber() {
    const PositionNumber = Math.floor(Math.random() * this.gameState.possiblePlayerPosition.length);
    const playerPosition = this.gameState.possiblePlayerPosition[PositionNumber];
    this.gameState.possiblePlayerPosition.splice(PositionNumber, 1);
    return playerPosition;
  }

  generateEnemyTeam() {
    const enemyTeam = [];
    const team = generateTeam(
      [Daemon, Undead, Vampire],
      this.gameState.playersMaxLevel,
      this.gameState.countPlayers,
    );
    for (const item of team.characters) {
      enemyTeam.push(new PositionedCharacter(item, this.getEnemyPositionNumber()));
    }
    return enemyTeam;
  }

  generateEnemyPositionNumber() {
    this.gameState.possibleEnemyPosition = [];
    const boardSize = this.gamePlay.boardSize ** 2;
    for (let i = 0; i < boardSize; i += 1) {
      if (i % this.gamePlay.boardSize === 6) {
        this.gameState.possibleEnemyPosition.push(i);
        this.gameState.possibleEnemyPosition.push(i + 1);
      }
    }
  }

  getEnemyPositionNumber() {
    const PositionNumber = Math.floor(Math.random() * this.gameState.possibleEnemyPosition.length);
    const enemyPosition = this.gameState.possibleEnemyPosition[PositionNumber];
    this.gameState.possibleEnemyPosition.splice(PositionNumber, 1);
    return enemyPosition;
  }

  positions() {
    this.generatePlayerPositionNumber();
    this.generateEnemyPositionNumber();
    const enemy = this.generateEnemyTeam();
    const player = this.generatePlayerTeam();
    this.gameState.teamOnBoard = player.concat(enemy);
    return player.concat(enemy);
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(this.gameState.themesDraw);
    this.gamePlay.redrawPositions(this.positions());

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onClickNewGame.bind(this));
    this.gamePlay.addLoadGameListener(this.onClicLoadGame.bind(this));
    this.gamePlay.addSaveGameListener(this.onClickSaveGame.bind(this));
    // TODO: load saved stated from stateService
  }

  onClickSaveGame() {
    this.stateService.save(GameState.from(this.gameState));
    GamePlay.showMessage('Игра сохранена');
  }

  onClicLoadGame() {
    const load = this.stateService.load();
    this.gameState.countPlayers = load.countPlayers;
    this.gameState.playersMaxLevel = load.playersMaxLevel;
    this.gameState.activeCharacter = load.activeCharacter;
    this.gameState.gameLevelCount = load.gameLevelCount;
    this.gameState.stopGameFlag = load.stopGameFlag;
    this.gameState.themesDraw = load.themesDraw;
    this.gamePlay.drawUi(this.gameState.themesDraw);
    this.gameState.teamOnBoard = [];
    for (const item of load.teamOnBoard) {
      this.gameState.teamOnBoard.push(item);
    }
    this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
  }

  onClickNewGame() {
    this.gameState.countPlayers = 3;
    this.gameState.playersMaxLevel = 1;
    this.gameState.activeCharacter = false;
    this.gameState.gameLevelCount = 1;
    this.gameState.stopGameFlag = false;
    this.gameState.themesDraw = themes.prairie;
    this.gamePlay.drawUi(this.gameState.themesDraw);
    this.gamePlay.redrawPositions(this.positions());
  }

  onCellClick(index) {
    if (this.gameState.stopGameFlag) {
      return false;
    }
    const boardSize = this.gamePlay.boardSize ** 2;
    const playerTeam = ['bowman', 'magician', 'swordsman'];
    const cellCharacter = this.gamePlay.cells[index].querySelector('.character');
    for (let i = 0; i < boardSize; i += 1) {
      this.gamePlay.deselectCell(i);
    }
    if (!this.gameState.isActive) {
      if (!cellCharacter) {
        GamePlay.showMessage('Не то');
      }
      const characterName = cellCharacter.className.split(/\s+/)[1];
      playerTeam.forEach((item) => {
        if (characterName === item) {
          this.gamePlay.selectCell(index);
          this.gameState.activeCharacter = index;
          this.gameState.isActive = true;
          this.setValidMove(item, index);
          this.setValidAttack(item, index);
        }
      });
    }

    if (this.gameState.isActive) {
      this.gameState.validMove.forEach((move) => {
        if (move === index && !cellCharacter) {
          this.gameState.teamOnBoard.forEach((item) => {
            if (this.gameState.activeCharacter === item.position) {
              item.position = index;
              this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
              this.clear();
              this.enemyTurn();
            }
          });
        }
      });

      this.gameState.validAttack.forEach((attack) => {
        if (attack === index && cellCharacter) {
          const characterName = cellCharacter.className.split(/\s+/)[1];
          if (characterName === 'daemon' || characterName === 'undead' || characterName === 'vampire') {
            let attacker;
            let target;
            this.gameState.teamOnBoard.forEach((item) => {
              if (this.gameState.activeCharacter === item.position) {
                attacker = item.character.attack;
              }
              if (index === item.position) {
                target = item.character.defense;
              }
            });
            const damage = Math.round(Math.max(attacker - target, attacker * 0.1));
            const promise = this.gamePlay.showDamage(index, damage);
            promise.then((result) => this.gameState.teamOnBoard.forEach((item) => {
              if (index === item.position) {
                item.character.health -= damage;
                if (item.character.health <= 0) {
                  this.death(item.position);
                  this.clear();
                }
                this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
                if (this.isWin()) {
                  this.gameLevelUp();
                } else {
                  this.enemyTurn();
                }
              }
            }), null);
          }
        }
      });
      if (cellCharacter) {
        playerTeam.forEach((item) => {
          const characterName = cellCharacter.className.split(/\s+/)[1];
          if (characterName === item) {
            this.gamePlay.selectCell(index);
            this.gameState.activeCharacter = index;
            this.setValidMove(item, index);
            this.setValidAttack(item, index);
          }
        });
      }
    }
    return true;
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.gameState.stopGameFlag) {
      this.gamePlay.setCursor(cursors.notallowed);
      return false;
    }
    const allCells = this.gamePlay.cells;
    const cellCharacter = allCells[index].querySelector('.character');
    if (cellCharacter) {
      const characterName = cellCharacter.className.split(/\s+/)[1];
      if (characterName === 'magician' || characterName === 'bowman' || characterName === 'swordsman') {
        this.gamePlay.setCursor(cursors.pointer);
      }
      for (const item of this.gameState.teamOnBoard) {
        if (item.position === index) {
          const msg = `\u{1F396}: ${item.character.level} \u{2694}:${item.character.attack} \u{1F6E1}:${item.character.defense} \u{2764}:${item.character.health}`;
          this.gamePlay.showCellTooltip(msg, index);
        }
      }
    }

    if (this.gameState.isActive) {
      let flag = false;
      this.gameState.validMove.forEach((item) => {
        if (item === index && !cellCharacter) {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor(cursors.pointer);
          flag = true;
        }
      });

      this.gameState.validAttack.forEach((item) => {
        if (item === index && cellCharacter) {
          const characterName = cellCharacter.className.split(/\s+/)[1];
          if (characterName === 'daemon' || characterName === 'undead' || characterName === 'vampire') {
            this.gamePlay.selectCell(index, 'red');
            this.gamePlay.setCursor(cursors.crosshair);
            flag = true;
          }
        }
      });
      if (!flag && cellCharacter) {
        const characterName = cellCharacter.className.split(/\s+/)[1];
        if (characterName === 'daemon' || characterName === 'undead' || characterName === 'vampire') {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      }
    }
    return true;
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    if (this.gameState.stopGameFlag) {
      this.gamePlay.setCursor(cursors.notallowed);
      return false;
    }
    const cell = this.gamePlay.cells[index];
    if (cell.querySelector('.character')) {
      const characterName = cell.querySelector('.character').className.split(/\s+/)[1];
      if (characterName === 'daemon' || characterName === 'undead' || characterName === 'vampire') {
        this.gamePlay.deselectCell(index);
        this.gamePlay.setCursor(cursors.auto);
      }
      this.gamePlay.hideCellTooltip(index);
    } else {
      this.gamePlay.deselectCell(index);
      this.gamePlay.setCursor(cursors.auto);
    }
    return true;
  }

  setValidMove(character, currentIndex) {
    this.gameState.validMove = [];
    let i = 0;
    const { boardSize } = this.gamePlay;
    const indexOfmove = currentIndex % boardSize;
    let moveBack;
    let moveStraight;

    if (character === 'bowman' || character === 'vampire') {
      i = 2;
      if (indexOfmove <= 2) {
        moveBack = indexOfmove;
        moveStraight = 2;
      } else if (indexOfmove >= 6) {
        moveBack = 2;
        moveStraight = boardSize - 1 - indexOfmove;
      } else {
        moveBack = 2;
        moveStraight = 2;
      }
    }

    if (character === 'magician' || character === 'daemon') {
      i = 1;
      if (indexOfmove === 0) {
        moveBack = 0;
        moveStraight = 1;
      } else if (indexOfmove === 7) {
        moveBack = 1;
        moveStraight = 0;
      } else {
        moveBack = 1;
        moveStraight = 1;
      }
    }

    if (character === 'swordsman' || character === 'undead') {
      i = 4;
      if (indexOfmove >= 4) {
        moveBack = 4;
        moveStraight = boardSize - 1 - indexOfmove;
      } else {
        moveBack = indexOfmove;
        moveStraight = 4;
      }
    }
    // backMove
    for (let k = 1; k <= moveBack; k += 1) {
      this.gameState.validMove.push(currentIndex - k);
      this.gameState.validMove.push(currentIndex + (boardSize * k) - k);
      this.gameState.validMove.push(currentIndex - (boardSize * k) - k);
    }

    // straight
    for (let k = 1; k <= moveStraight; k += 1) {
      this.gameState.validMove.push(currentIndex + k);
      this.gameState.validMove.push(currentIndex + (boardSize * k) + k);
      this.gameState.validMove.push(currentIndex - (boardSize * k) + k);
    }

    // up and down
    for (let k = 1; k <= i; k += 1) {
      this.gameState.validMove.push(currentIndex + (boardSize * k));
      this.gameState.validMove.push(currentIndex - (boardSize * k));
    }

    this.gameState.validMove.forEach((item, index) => {
      if (item > 63 || item < 0) {
        delete this.gameState.validMove[index];
      }
    });
  }

  setValidAttack(character, currentIndex) {
    this.gameState.validAttack = [];
    let i = 0;
    const { boardSize } = this.gamePlay;
    const indexOfmove = currentIndex % boardSize;
    let attackBack;
    let attackStraight;

    if (character === 'bowman' || character === 'vampire') {
      i = 2;
      if (indexOfmove <= 2) {
        attackBack = indexOfmove;
        attackStraight = 2;
      } else if (indexOfmove >= 6) {
        attackBack = 2;
        attackStraight = boardSize - 1 - indexOfmove;
      } else {
        attackBack = 2;
        attackStraight = 2;
      }
    }

    if (character === 'magician' || character === 'daemon') {
      i = 4;
      if (indexOfmove >= 4) {
        attackBack = 4;
        attackStraight = boardSize - 1 - indexOfmove;
      } else {
        attackBack = indexOfmove;
        attackStraight = 4;
      }
    }

    if (character === 'swordsman' || character === 'undead') {
      i = 1;
      if (indexOfmove === 0) {
        attackBack = 0;
        attackStraight = 1;
      } else if (indexOfmove === 7) {
        attackBack = 1;
        attackStraight = 0;
      } else {
        attackBack = 1;
        attackStraight = 1;
      }
    }

    // backAttack
    for (let k = 1; k <= attackBack; k += 1) {
      this.gameState.validAttack.push(currentIndex - k);
    }

    // straight
    for (let k = 1; k <= attackStraight; k += 1) {
      this.gameState.validAttack.push(currentIndex + k);
    }

    // up
    for (let k = 1; k <= i; k += 1) {
      const upMove = currentIndex + (boardSize * k);
      this.gameState.validAttack.push(upMove);
      for (let q = 1; q <= attackStraight; q += 1) {
        this.gameState.validAttack.push(upMove + q);
      }
      for (let q = 1; q <= attackBack; q += 1) {
        this.gameState.validAttack.push(upMove - q);
      }
    }

    // down
    for (let k = 1; k <= i; k += 1) {
      const downMove = currentIndex - (boardSize * k);
      this.gameState.validAttack.push(downMove);
      for (let q = 1; q <= attackStraight; q += 1) {
        this.gameState.validAttack.push(downMove + q);
      }
      for (let q = 1; q <= attackBack; q += 1) {
        this.gameState.validAttack.push(downMove - q);
      }
    }
    this.gameState.validAttack.forEach((item, index) => {
      if (item > 63 || item < 0) {
        delete this.gameState.validAttack[index];
      }
    });
  }

  clear() {
    this.gameState.activeCharacter = false;
    this.gameState.validAttack = [];
    this.gameState.validMove = [];
  }

  enemyTurn() {
    let flag = true;
    const enemyTeam = [];
    this.gameState.teamOnBoard.forEach((item) => {
      if (item.character.type === 'vampire' || item.character.type === 'undead' || item.character.type === 'daemon') {
        enemyTeam.push(item);
      }
    });
    const randomI = Math.round(Math.random() * (enemyTeam.length - 1));
    const characterTurn = enemyTeam[randomI];
    if (characterTurn) {
      this.setValidAttack(characterTurn.character.type, characterTurn.position);
      this.setValidMove(characterTurn.character.type, characterTurn.position);
    }

    this.gameState.validAttack.forEach((item) => {
      if (flag) {
        const cell = this.gamePlay.cells[item];
        const cellCharacter = cell.querySelector('.character');
        if (cellCharacter) {
          const characterName = cellCharacter.className.split(/\s+/)[1];
          if (characterName === 'bowman' || characterName === 'magician' || characterName === 'swordsman') {
            let attacker;
            let target;
            this.gameState.teamOnBoard.forEach((valid) => {
              if (characterTurn.position === valid.position) {
                attacker = valid.character.attack;
              }
              if (item === valid.position) {
                target = valid.character.defense;
              }
            });
            const damage = Math.round(Math.max(attacker - target, attacker * 0.1));
            flag = false;
            const promise = this.gamePlay.showDamage(item, damage);
            promise.then((result) => this.gameState.teamOnBoard.forEach((valid) => {
              if (item === valid.position) {
                valid.character.health -= damage;
                if (valid.character.health <= 0) {
                  this.death(valid.position);
                }
                if (this.isLose()) {
                  this.stopGame();
                }
                this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
                this.clear();
              }
            }), null);
          }
        }
      }
    });

    if (flag) {
      this.gameState.validMove.forEach((valid) => {
        if (flag) {
          const cell = this.gamePlay.cells[valid];
          const cellCharacter = cell.querySelector('.character');
          if (!cellCharacter) {
            this.gameState.teamOnBoard.forEach((item) => {
              if (characterTurn.position === item.position) {
                item.position = valid;
                this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
                flag = false;
                this.clear();
              }
            });
          }
        }
      });
    }
  }

  death(position) {
    this.gameState.teamOnBoard.forEach((item, index) => {
      if (item.position === position) {
        this.gameState.teamOnBoard.splice(index, 1);
      }
    });
  }

  isWin() {
    const emptyEnemy = [];
    const enemyTeam = ['vampire', 'undead', 'daemon'];
    for (const item of this.gameState.teamOnBoard) {
      for (const enemy of enemyTeam) {
        if (enemy === item.character.type) {
          emptyEnemy.push(item);
        }
      }
    }
    if (emptyEnemy.length === 0) {
      return true;
    }
    return false;
  }

  isLose() {
    const emptyPlayer = [];
    const playerTeam = ['bowman', 'magician', 'swordsman'];
    for (const item of this.gameState.teamOnBoard) {
      for (const player of playerTeam) {
        if (player === item.character.type) {
          emptyPlayer.push(item);
        }
      }
    }
    if (emptyPlayer.length === 0) {
      return true;
    }
    return false;
  }

  gameLevelUp() {
    this.generatePlayerPositionNumber();
    this.gameState.teamOnBoard.forEach((item) => {
      item.character.attack = Math.round(
        Math.max(
          item.character.attack,
          item.character.attack * (80 + item.character.health) / 100,
        ),
      );
      item.character.defense = Math.round(
        Math.max(
          item.character.defense,
          item.character.defense * (80 + item.character.health) / 100,
        ),
      );
      item.character.level += 1;
      if (item.character.health >= 20) {
        item.character.health = 100;
      } else {
        item.character.health += 80;
      }
      item.position = this.getPlayerPositionNumber();
    });
    this.gameState.gameLevelCount += 1;
    this.gameState.countPlayers += 1;
    this.gameState.playersMaxLevel += 1;

    const morePlayerCharacters = this.gameState.countPlayers - this.gameState.teamOnBoard.length;

    const team = generateTeam(
      [Bowman, Magician, Swordsman],
      this.gameState.playersMaxLevel,
      morePlayerCharacters,
    );
    for (const item of team.characters) {
      this.gameState.teamOnBoard.push(
        new PositionedCharacter(item, this.getPlayerPositionNumber()),
      );
    }

    this.generateEnemyPositionNumber();
    this.gameState.teamOnBoard = this.gameState.teamOnBoard.concat(this.generateEnemyTeam());
    if (this.gameState.gameLevelCount === 2) {
      this.gameState.themesDraw = themes.desert;
    } else if (this.gameState.gameLevelCount === 3) {
      this.gameState.themesDraw = themes.arctic;
    } else if (this.gameState.gameLevelCount === 4) {
      this.gameState.themesDraw = themes.mountain;
    } else {
      this.stopGame();
      return false;
    }
    this.gamePlay.drawUi(this.gameState.themesDraw);
    this.gamePlay.redrawPositions(this.gameState.teamOnBoard);
    return true;
  }

  stopGame() {
    this.gameState.stopGameFlag = true;
    GamePlay.showMessage('Вы выиграли! или проиграли)');
  }
}
