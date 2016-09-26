import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Cards from '../Cards.js';

let _bjObject = {
  player: [],
  dealer: [],
  deck: [],
  hold: 0,
  winner: ''
};
const _theDeck = Cards.deckArray;

class CardsStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let { type, payload } = action;
      switch(type) {
        case 'GAME_RESTART':
          _bjObject.deck = _.shuffle(_theDeck);
          _bjObject = {
            player: _bjObject.deck.splice(0,2),
            dealer: _bjObject.deck.splice(0,2),
            deck: _bjObject.deck,
            hold: 0,
            winner: ''
          }
          this.emit('CHANGE');
          break;
        case 'HIT':
          if (!_bjObject.hold && this.getSum('player') <= 21) {
            _bjObject.player = _bjObject.player.concat(_bjObject.deck.splice(0,1));
            this.emit('CHANGE');
          }
          break;
        case 'HOLD':
          let playerSum = this.getSum('player');
          if (playerSum <= 21) {
            _bjObject.hold = playerSum;
            _bjObject.dealer[0].push(true);
            while (this.getSum('dealer') < 17) {
              _bjObject.dealer = _bjObject.dealer.concat(_bjObject.deck.splice(0,1));
            }
            if (this.getSum('dealer') > 21 || this.getSum('dealer') <= this.getSum('player')) {
              _bjObject.winner = 'player';
            } else {
              _bjObject.winner = 'dealer';
            }
            this.emit('CHANGE');
          }
          break;
      }
    });

    this.on('CHANGE', () => {
      if (_bjObject.winner) {
        setTimeout(() => alert(_bjObject.winner === 'player' ? 'You Win!' : 'You Lose!'), 1000);
      }yes
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getSum(role) {
    let { dealer, player } = _bjObject;
    let value = (role === 'player' ? player : dealer);
    let c = value.filter(card => card[1].substr(0,1) === 'a').length; 
    let sum  = value.reduce((s, card) => s + card[0], 0);
    if (sum + (c * 10) <= 21) return sum + (c * 10);
    return sum;
  }

  getValueFromKeyInObject(value) {
    return _bjObject[value];
  }
};

export default new CardsStore();
