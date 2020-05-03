// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// This line of code has been added so that the form data from the store gets removed when we send a survey. We are keeping the data in the store even after SurveyForm gets unmounted by using "destroyOnUnmount: false" in reduxForm. This is done so that SurveyFormReview can use the same data.
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
