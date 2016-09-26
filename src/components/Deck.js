import React, { Component } from 'react';
import CardActions from '../actions/CardActions';
import CardStore from '../stores/CardStore';

export default class Deck extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <h4>Deck</h4>
        <img
          className='back of card'
          src={`http://www.guntheranderson.com/cards/feb97/gramabk1.gif`}
        />
        <span className="deck buttons">
          <button className="btn btn-danger glyphicon glyphicon-remove" onClick={CardActions.Hold}>Hold</button>
        </span>
        <span className="deck buttons">
          <button className="btn glyphicon glyphicon-ok btn-success" onClick={CardActions.Hit}>Hit</button>
        </span>
      </div>
    );
  }
};
