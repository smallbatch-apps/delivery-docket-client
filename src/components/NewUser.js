import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

import {createNewUser} from '../redux/actions/actions';

class NewUser extends Component {

  state = {
    name: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createNewUser(this.state);
    this.props.history.push('/login')
  }

  handleFieldChange = ({target}) => {
    this.setState({[target.id]: target.value});
  }

  render() {
    return <Fragment>
      <h3>Create New User</h3>

      <p>Enter your details to create a new user to access the docket system.</p>

      <form action="" className="row">

        <div className="col-sm">

          <h5>Your Info</h5>

          <p>Use these details to log in.</p>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" className="form-control" id="name" placeholder=""
              value={this.state.name} onChange={this.handleFieldChange} />
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input type="text" className="form-control" id="address" placeholder=""
              value={this.state.address} onChange={this.handleFieldChange} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" id="phone" placeholder=""
              value={this.state.phone} onChange={this.handleFieldChange} />
          </div>

        </div>

        <div className="col-sm">

          <h5>Login</h5>

          <p>Use these details to log in.</p>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="user-email"
              value={this.state.email} onChange={this.handleFieldChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="" autoComplete="current-password"
              value={this.state.password} onChange={this.handleFieldChange} />
          </div>

          <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Create User</button>

        </div>
      </form>

    </Fragment>
  }

}

const mapStateToProps = ({loginStatus}) => ({loginStatus});

const mapDispatchToProps = {createNewUser};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);