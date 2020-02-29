import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import requireAuth from '../requireAuth';
import { connect } from "react-redux";
import { createItem } from "../../actions/index"

class ItemCreate extends Component {
    renderError({ error, touched }) {
      if (touched && error){
        return (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        );
      }
    }

    renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error": ""}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }
     
  onSubmit = (formValues) => {
    this.props.createItem(formValues);
  }

  render() {
      return (
        <form 
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field 
          name="name" 
          component={this.renderInput} 
          label="enter name"
          />
          <Field 
          name="category" 
          component={this.renderInput} 
          label="enter category"
          />
          <button className="ui button primary">submit</button>
        </form>
    );
  }
}

const Validate = (formValues) => {
  const errors = {};

  if(!formValues.name){
    errors.title = "enter a name"
  }

  if(!formValues.category){
    errors.description = "enter a category"
  }
  return errors;
};

// export default requireAuth(reduxForm({
//   form: 'itemCreate',
//   validate: Validate
// })(ItemCreate));

const formWrapped = reduxForm({
    form: 'itemCreate',
    validate: Validate
  })(ItemCreate);

export default connect(null, { createItem })(formWrapped);