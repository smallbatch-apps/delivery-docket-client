import React, {Fragment, Component} from 'react';
import {logInUser, logOutUser} from '../../redux/actions/actions';
import {connect} from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import LoginIsLoggedIn from './LoginIsLoggedIn';

class Login extends Component {

  state = {email: '', password: ''};

  handleEmailChange = ({target}) => this.setState({email: target.value});

  handlePasswordChange = ({target}) => this.setState({password: target.value});

  handleSubmit = event => {
    event.preventDefault();
    this.props.logInUser(this.state.email, this.state.password);
  }

  render() {
    if (this.props.loginStatus) {
      return <LoginIsLoggedIn logOutUser={this.props.logOutUser} />;
    }
    const hasError = typeof this.props.errors.loginForm !== 'undefined';
    return <Fragment>
      <h3>Log In</h3>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores neque laudantium illo corrupti, error modi quas voluptates ea est nemo natus minima tenetur quasi omnis. Vero repellendus alias saepe!</p>

      <div className="card">
        <div className="card-body">

        { hasError && <div className="alert alert-danger" role="alert">
          Your username or password is not correct
        </div> }

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              placeholder="Enter email"
              autoComplete="user-email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              isInvalid={hasError}
              />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              isInvalid={hasError}
            />
          </Form.Group>
          <Button variant="primary" type="submit" >Log In</Button>
        </Form>

        </div>
      </div>

    </Fragment>
  }

}

const mapStateToProps = ({ loginStatus, errors }) => ({ loginStatus, errors });

const mapDispatchToProps = { logInUser, logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);