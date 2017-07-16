import React, { Component } from 'react';
import API from '../lib/Api';

const isValidPassword = password => password.length > 6 && /^\w+$/.test(password);
const isValidEmail = email => /^\w+@\w+.\w+$/.test(email);

class EmailField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showErrors: false
    };
  }

  handleChange(e) {
    const validity = isValidEmail(e.target.value);
    this.props.onEmailChange({
      valid: validity,
      value: e.target.value
    });
    this.setState({ showErrors: !validity });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="email"> Your email </label>
        <input
          className="form-control"
          id="email"
          name="email"
          required="required"
          type="email"
          placeholder="myusername or mymail@mail.com"
          onChange={this.handleChange}
        />
        { this.state.showErrors &&
          <span>Invlaid Email</span>
        }
      </div>
    )
  }
}

class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showErrors: false
    };
  }

  handleChange(e) {
    this.props.onPasswordChange({
      valid: isValidPassword(e.target.value),
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="password" className="youpasswd"> Your password </label>
        <input
          className="form-control"
          id="password"
          name="password"
          required="required"
          type="password"
          placeholder="eg. X8df!90EO"
          onChange={this.handleChange}
        /> 
      </div>
    );
  }
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      password: {
        valid: false,
        value: null
      },
      email: {
        valid: false,
        value: null
      }
    };
  }

  handlePasswordChange(password) {
    this.setState({
      password: {
        valid: password.valid,
        value: password.value
      }
    });
  }

  handleEmailChange(email) {
    this.setState({
      email: {
        valid: email.valid,
        value: email.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email.valid && this.state.password.valid) {
      API.SessionApi.login({
        email: this.state.email.value,
        password: this.state.password.value
      });
    }
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col-sm-12 col-md-6 col-md-offset-3">

          <form onSubmit={this.handleSubmit}>
            <h1>Log In</h1>
            <EmailField 
              onEmailChange={this.handleEmailChange}
            />
            <PasswordField 
              onPasswordChange={this.handlePasswordChange}
            />
						<div className="form-group">
              <input type="submit" value="Submit" />
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default SignIn;
