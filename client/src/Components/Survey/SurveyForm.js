import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import config from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(config, ({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          component={SurveyField}
          type="text"
        />
      );
    });
  }

  render() {
    return (
      <div style={{ margin: '50px 30%' }}>
        <form
          onSubmit={this.props.handleSubmit(() => this.props.onFormSubmit())}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text ">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  error.recipients = validateEmails(values.recipients || '');

  _.each(config, ({ name }) => {
    if (!values[name]) {
      error[name] = 'You must provide value';
    }
  });

  return error;
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
