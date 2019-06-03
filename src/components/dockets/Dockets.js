import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Octicon, { PlusSmall } from '@githubprimer/octicons-react';

import { fetchAllDockets } from '../../redux/actions/actions';

import ListItem from './ListItem';

class Dockets extends Component {

  state = { lodgedDockets: [], unlodgedDockets: [] };

  async componentDidMount() {
    await this.props.fetchAllDockets();

    const { dockets } = this.props;

    const lodgedDockets = dockets.filter(docket => !!docket.lodgementDate);
    const unlodgedDockets = dockets.filter(docket => !docket.lodgementDate);

    this.setState({ lodgedDockets, unlodgedDockets });
  }

  render() {
    return <Fragment>
      <h3>Dockets</h3>

      <Link to="/dockets/new" className="btn btn-primary mt-3 btn-block">
        <Octicon icon={PlusSmall} /> Create New Delivery Docket
      </Link>

      <div className="row">

        {!!this.state.unlodgedDockets.length && <div className="col-sm">
          <h4 className="mt-3">Outstanding Dockets</h4>

          <ul className="list-group mt-3">
            {this.state.unlodgedDockets.map(item => <ListItem item={item} key={item._id} />)}
          </ul>
        </div>}

        {!!this.state.lodgedDockets.length && <div className="col-sm">
          <h4 className="mt-3">Lodged Dockets</h4>

          <ul className="list-group my-3">
            {this.state.lodgedDockets.map(item => <ListItem item={item} key={item._id} />)}
          </ul>
        </div>}

      </div>

    </Fragment>
  }
}

const mapStateToProps = ({ dockets }) => ({ dockets });

export default connect(mapStateToProps, { fetchAllDockets })(Dockets);