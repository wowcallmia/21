import React, { Component } from 'react';
import CardStore from '../stores/CardStore';

export default class DealerCards extends Component {
  constructor() {
    super();

    this.state = {
      dealerCards: CardStore.getValueFromKeyInObject('dealer'),
      dealerSum: CardStore.getSum('dealer')
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
      dealerCards: CardStore.getValueFromKeyInObject('dealer'),
      dealerSum: CardStore.getSum('dealer'),
      hold: CardStore.getValueFromKeyInObject('hold')
    });
  }

  render() {
    let CurrentHand = this.state.dealerCards.map((card, i) => {
      let cardPath = (!card[2] && i === 0 ? '🂠' : card[1]);
      return (
        <h1 key={card[1]} className='card'> {`${cardPath}`} </h1>
      )
    });

    return (
      <div className="col-xs-12 col-md-6">
        <h4>Dealer Hand</h4>
        {CurrentHand}
      </div>
    );
  }
};
