import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

import { fetchAllDockets } from '../../redux/actions/actions';

import ListItem from './ListItem';

class Dockets extends Component {

  state = { currentDockets: [],  expiredDockets: []};

  async componentDidMount() {
    await this.props.fetchAllDockets();

    const { dockets } = this.props;

    this.setState({
      currentDockets: dockets.filter(docket => isAfter(new Date(), new Date(docket.pickUpDate))),
      expiredDockets: dockets.filter(docket => isBefore(new Date(), new Date(docket.pickUpDate)))
    });
  }

  render() {
    return <Fragment>
      <h3>Dockets</h3>

      <Link to="/dockets/new" className="btn btn-primary my-3 btn-block">Create New Delivery Docket</Link>

      <div className="row">

      { !!this.state.currentDockets.length && <div className="col-sm">
        <h4>Standing Dockets</h4>

        <ul className="list-group my-3">
          {this.state.currentDockets.map(item => <ListItem item={item} key={item._id} />)}
        </ul>
      </div> }

      { !!this.state.expiredDockets.length && <div className="col-sm">
        <h4>Expired Dockets</h4>

        <ul className="list-group mt-3">
          {this.state.expiredDockets.map(item => <ListItem item={item} key={item._id} />)}
        </ul>
      </div> }
      </div>

    </Fragment>
  }

}

const mapStateToProps = ({dockets}) => ({dockets});

export default connect(mapStateToProps, {fetchAllDockets})(Dockets);