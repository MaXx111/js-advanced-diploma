import GameController from '../GameController.js';
import GamePlay from '../GamePlay.js';
import GameStateService from '../GameStateService.js';

// тест выдает ошибку на строке 12,
// а если не создать экземпляр gamePlay
// я не понимаю как еще сделать тесты для методов вывожда информации о персонаже

// const gamePlay = new GamePlay();
// gamePlay.bindToDOM(document.querySelector('#game-container'));

// const stateService = new GameStateService(localStorage);

// const gameCtrl = new GameController(gamePlay, stateService);
// gameCtrl.init();

// test('Should genetate team', () => {
//     let allCells = gameCtrl.gamePlay.cells
//     let cellCharacter = allCells[index].querySelector('.character');
//     let result = []
//     if(cellCharacter) {
//       let characterName = cellCharacter.className.split(/\s+/)[1];
//       this.teamOnBoard.forEach(item => {
//         if(item.type === characterName){
//             result.push(item);
//         }
//       });
//     }
//     expect(result.length).toEqual(3);
// });
