import React, { Component } from 'react';
import CardStore from '../stores/CardStore';

export default class PlayerCards extends Component {
  constructor() {
    super();

    this.state = {
      playerCards: CardStore.getValueFromKeyInObject('player'),
      playerSum: CardStore.getSum('player')
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      playerCards: CardStore.getValueFromKeyInObject('player'),
      playerSum: CardStore.getSum('player')
    });
  }

  render() {
    let { playerCards, playerSum } = this.state;
    let CurrentHand = playerCards.map(card => (
          <h1
            key={card[1]}
            className='card'
          >{`${card[1]}`}
          </h1>
            ));

    return (
      <div className="col-xs-12">
        <h4>Player Hand <span>{playerSum > 21 ? 'BUST' : ''}</span></h4>
        {CurrentHand}
      </div>
    );
  }
};
