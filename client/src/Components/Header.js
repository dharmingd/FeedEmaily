import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <div
            className="preloader-wrapper small active"
            style={{ position: 'absolute', top: '25%', right: '10%' }}
          >
            <div className="spinner-layer spinner-yellow-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        );
      default:
        return [
          <li key="credits">Credits : {this.props.auth.credits}</li>,
          <li key="payment">
            <Payment />
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{ marginLeft: '20px' }}>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="brand-logo left"
          >
            FeedEmaily
          </Link>
          <ul className="right navBarCust">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
