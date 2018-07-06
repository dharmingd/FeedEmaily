import React, { Component } from 'react';
import { fetchSurveys } from '../../Actions';
import { connect } from 'react-redux';
class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveyList() {
    if (this.props.surveys.length === 0) {
      return (
        <div className="grey-text text-darken-1">
          You haven't created any surveys.
        </div>
      );
    }

    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title teal-text text-lighten-2">
              {survey.title}
            </span>
            <p className="grey-text text-darken-1">{survey.body}</p>
            <p className="right grey-text text-darken-1">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes : {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="container">{this.renderSurveyList()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
