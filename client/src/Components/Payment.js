import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../Actions';
class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="FeedEmaily"
        description="$5 for 5 email survey credits"
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={token => this.props.handleToken(token)}
      >
        <button className="btn green lighten-1">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payment);
