import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome, faPlusSquare } from '@fortawesome/pro-light-svg-icons';

import { fetchAllDockets } from '../../redux/actions/actions';

import ListItem from './ListItem';

class Dockets extends Component {

  state = { lodgedDockets: [], unlodgedDockets: [] };

  async componentDidMount() {
    await this.props.fetchAllDockets();

    const { dockets } = this.props;

    const lodgedDockets = dockets.filter(docket => !!docket.lodgement_date);
    const unlodgedDockets = dockets.filter(docket => !docket.lodgement_date);

    this.setState({ lodgedDockets, unlodgedDockets });
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Deliveries</h3>

      <div className="row">

        {!!this.state.unlodgedDockets.length && <div className="col-sm">
          <h4 className="mt-3">Outstanding Deliveries</h4>

          <ul className="list-group mt-3">
          {this.state.unlodgedDockets.map(item => <ListItem item={item} key={item.id} />)}
          </ul>
        </div>}

        {!!this.state.lodgedDockets.length && <div className="col-sm">
          <h4 className="mt-3">Lodged Deliveries</h4>

          <ul className="list-group my-3">
          {this.state.lodgedDockets.map(item => <ListItem item={item} key={item.id} />)}
          </ul>
        </div>}

      </div>

      <Link to="/dockets/new" className="btn btn-primary mt-3 btn-block">
        <FontAwesomeIcon icon={faPlusSquare} className="mr-2" /> Create New Delivery Docket
      </Link>
    </Fragment>
  }
}

const mapStateToProps = ({ dockets }) => ({ dockets });

export default connect(mapStateToProps, { fetchAllDockets })(Dockets);