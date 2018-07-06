import React from 'react';

const LandingPage = () => {
  return (
    <div className="center-align">
      <div
        className="red-text text-lighten-3"
        style={{ fontSize: '3em', marginTop: '40px' }}
      >
        Welcome to FeedEmaily
      </div>
      <div className="grey-text text-darken-1">
        Take feedback from your users and improve your business with us.
      </div>
      <div
        className="teal-text text-lighten-3"
        style={{
          marginTop: '100px',
          fontSize: '1.8em',
          marginLeft: '25%',
          marginRight: '25%'
        }}
      >
        You can send feedback survey to your users from FeedEmaily and We will
        provide you results of feedback
      </div>
      <div
        className="red-text text-lighten-3"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '35%',
          right: '35%'
        }}
      >
        If you need any specific feature, contact me at{' '}
        <span
          className="teal-text text-lighten-3"
          style={{ fontSize: '1.2em' }}
        >
          ddholiya@asu.edu
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
