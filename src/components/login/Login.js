import React, {Fragment, Component} from 'react';
import {logInUser, logOutUser} from '../../redux/actions/actions';
import {connect} from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import LoginIsLoggedIn from './LoginIsLoggedIn';

class Login extends Component {

  state = {beekeeper_id: '', password: ''};

  handleBeekeeperIdChange = ({target}) => this.setState({beekeeper_id: target.value});

  handlePasswordChange = ({target}) => this.setState({password: target.value});

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.logInUser(this.state.beekeeper_id, this.state.password);
    window.location = '/';
  }

  render() {
    if (this.props.loginStatus) {
      return <LoginIsLoggedIn logOutUser={this.props.logOutUser} />;
    }
    const hasError = typeof this.props.errors.loginForm !== 'undefined';
    return <Fragment>
      <h3>Log In</h3>

      <p>Please enter your beekeeper ID and the password you selected in order to log in.</p>

      <div className="card">
        <div className="card-body">

        { hasError && <div className="alert alert-danger" role="alert">
          Your username or password is not correct
        </div> }

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Beekeeper ID</Form.Label>
            <Form.Control type="integer"
              placeholder="Beekeeper ID"
              autoComplete="user-beekeeper-id"
              value={this.state.beekeeper_id}
              onChange={this.handleBeekeeperIdChange}
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