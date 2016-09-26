import React, { Component } from 'react';
import Deck from './Deck';
import DealerCards from './DealerCards';
import PlayerCards from './PlayerCards';

import CardActions from '../actions/CardActions';

export default class Layout extends Component {
  componentDidMount() {
    CardActions.gameRestart();
  }

  render() {
    return (
      <div className='container text-center'>
        <h1 className='text-center'>21</h1>
        <button className="btn btn-default" onClick={CardActions.gameRestart}>again?</button>
        <div className="row">
          <Deck />
          <DealerCards />
          <PlayerCards />
        </div>
      </div>
    );
  }
};
