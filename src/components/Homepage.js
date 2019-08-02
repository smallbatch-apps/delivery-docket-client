import React, {Fragment, Component} from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {

  render() {
    return <Fragment>
      <h3>Quick Actions</h3>

      <Link to="/robbings/new" className="btn btn-primary btn-block">Rob Hive</Link>
      <Link to="/containers/new" className="btn btn-primary btn-block">Create Container</Link>
      <Link to="/dockets/new" className="btn btn-primary btn-block">Request Delivery</Link>

    </Fragment>
  }
}

// const mapStateToProps = ({ dockets }) => ({ dockets });

// export default connect(mapStateToProps, {fetchAllDockets, fetchAllLots})(Homepage);