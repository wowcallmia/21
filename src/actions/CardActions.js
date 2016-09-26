import AppDispatcher from '../AppDispatcher';

const CardActions = {
  gameRestart() {
    AppDispatcher.dispatch({ type: 'GAME_RESTART' });
  },
  Hit() {
    AppDispatcher.dispatch({ type: 'HIT' });
  },
  Hold() {
    AppDispatcher.dispatch({ type: 'HOLD' })
  }
};

module.exports = CardActions;
