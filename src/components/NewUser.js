import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';

import {createNewUser} from '../redux/actions/actions';

class NewUser extends Component {

  state = {
    email: '',
    beekeeper_id: '',
    password: '',
    confirm_password: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newUserDetails = this.state;
    delete newUserDetails.confirm_password;
    this.props.createNewUser(this.state);
    this.props.history.push('/login')
  }

  handleFieldChange = ({target}) => {
    this.setState({[target.id]: target.value});
  }

  handleBeekeeperIdChange = ({target}) => {
    const beekeeper_id = target.value.replace(/\D/g,'');
    this.setState({beekeeper_id});
  }

  render() {
    const passwordsAttempted = (this.state.password !== '' && this.state.confirm_password !== '');

    const passwordsNotMatching = (passwordsAttempted && this.state.password !== this.state.confirm_password);
    const passwordsMatching = (passwordsAttempted && this.state.password === this.state.confirm_password)

    return <Fragment>
      <h3>Create New User</h3>

      <p>Enter your details to create a new user to access the docket system.</p>

      <form action="" className="row">

        <div className="col-sm">

          <p>You will use these details to log in, so it is vitally important that you remember them as they <strong>can not be recovered</strong>.</p>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="text" className="form-control" id="email" placeholder="Enter email" autoComplete="user-email"
              value={this.state.email} onChange={this.handleFieldChange} />
          </div>

          <div className="form-group">
            <label htmlFor="beekeeper_id">Beekeeper ID</label>
            <input type="text" className="form-control" id="beekeeper_id" placeholder="Enter beekeeper id" autoComplete="user-beekeeper_id"
              value={this.state.beekeeper_id} onChange={this.handleBeekeeperIdChange} />
            <div className="form-text text-muted">You must only enter numbers into this field</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="" autoComplete="current-password"
              value={this.state.password} onChange={this.handleFieldChange} />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" className="form-control" id="confirm_password" placeholder="" autoComplete="current-confirm_password"
              value={this.state.confirm_password} onChange={this.handleFieldChange} />
          </div>

          {passwordsMatching && <div className="alert alert-success mb-3">
            Your entered passwords match
          </div>}

          {passwordsNotMatching && <div className="alert alert-danger mb-3">
            Your entered passwords do not match. Please enter them carefully.
          </div>}

          <button className="btn btn-primary btn-block"
            onClick={this.handleSubmit}
            disabled={!passwordsAttempted || this.state.beekeeper_id === '' || this.state.email === '' }
          >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Create User
          </button>

        </div>
      </form>

    </Fragment>
  }
}

const mapStateToProps = ({loginStatus}) => ({loginStatus});

const mapDispatchToProps = {createNewUser};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);