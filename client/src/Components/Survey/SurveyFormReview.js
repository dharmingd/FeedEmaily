import React from 'react';
import { connect } from 'react-redux';
import config from './formFields';
import _ from 'lodash';
import * as actions from '../../Actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ formValues, onBack, submitSurvey, history }) => {
  //console.log(props);

  const formReview = _.map(config, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <h5>{formValues[name]}</h5>
      </div>
    );
  });

  return (
    <div style={{ marginLeft: '30%', marginRight: '30%', marginTop: '50px' }}>
      <h5>Confirm yout values</h5>
      {formReview}
      <button
        className="yellow btn-flat darken-3 white-text"
        onClick={() => onBack()}
      >
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return { formValues: form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
