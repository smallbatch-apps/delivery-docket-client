import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Homepage extends Component {

  render() {
    return <Fragment>
      <h3 className="mb-3">Quick Actions</h3>

      { this.props.loginStatus && <Fragment>
        <Link to="/robbings/new" className="btn btn-primary btn-block">Rob Hive</Link>
        <Link to="/containers/new" className="btn btn-primary btn-block">Create Container</Link>
        <Link to="/dockets/new" className="btn btn-primary btn-block">Request Delivery</Link>
      </Fragment> }

      { !this.props.loginStatus && <Fragment>
        <Link to="/login" className="btn btn-primary btn-block">Log In</Link>
        <Link to="/new-user" className="btn btn-primary btn-block">New User</Link>
      </Fragment> }

    </Fragment>
  }
}

const mapStateToProps = ({ loginStatus }) => ({ loginStatus });

export default connect(mapStateToProps)(Homepage);