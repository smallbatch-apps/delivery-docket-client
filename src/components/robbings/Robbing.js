import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { fetchAllLots } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

class Lot extends Component {
  state = {
    variety: '',
    created_at: '2019-07-12 04:13:50',
    containers: []
  }

  async componentDidMount() {

    if (!this.props.lots.length) {
      await this.props.fetchAllLots();
    }
    const lotId = +this.props.match.params.id;
    const lot = this.props.lots.find(({id}) => id === lotId);

    this.setState({...lot});
  }

  handleClickHome = () => this.props.history.push('/');

  handleClickLots = () => this.props.history.push('/lots');

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickLots}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Lot Details</h3>

      <dl className="row">
        <dt className="col-3">Variety</dt>
        <dd className="col-9">{this.props.varieties[this.state.variety_id]}</dd>

        <dt className="col-3">Created</dt>
        <dd className="col-9">{format(new Date(this.state.created_at), 'yyyy/MM/dd')}</dd>

        <dt className="col-3">Shipping</dt>
        <dd className="col-9">None</dd>

      </dl>

      <h4>Containers</h4>

      <ul className="list-group list-group-flush">
        {this.state.containers.map(container => <li className="list-group-item" key={container.id}>{container.barcode}</li>)}
        <li className="list-group-item"><Link to={`/lots/${this.state.id}/containers/new`} className="btn btn-primary btn-block">Add Container</Link></li>
      </ul>

    </Fragment>
  }

}

const mapStateToProps = ({lots, varieties}) => ({lots, varieties});

export default connect(mapStateToProps, {fetchAllLots})(Lot);