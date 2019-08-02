import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

import {fetchAllContainers} from '../../redux/actions/actions';

class Containers extends Component {

  state = {containers: []}

  async componentDidMount() {

    if(!this.props.containers.length) {
      await this.props.fetchAllContainers();
    }
    const containers = this.props.containers.filter(({docket_id}) => !docket_id);

    this.setState({containers});
  }

  handleAdd = () => this.props.history.push('/containers/new');
  handleGoToContainer = () => this.props.history.push(`/containers/`);

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>All Open Containers</h3>

      <table className="table mt-3">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Type</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.containers.map(container => <tr key={container.id}>
          <td>{container.barcode}</td>
          <td>{container.type}</td>
          <td>{format(new Date(container.created_at), 'dd-MM-yyyy')}</td>
          <td><Link to={`/containers/${container.id}`}>&raquo;</Link></td>
        </tr>)}
        <tr>
          <td colSpan="4">
            <button className="btn btn-primary btn-block"
              onClick={this.handleAdd}>
              Add New Container
            </button>
          </td>
        </tr>
      </tbody>

      </table>

    </Fragment>
  }

}

const mapStateToProps = ({containers}) => ({containers});

export default connect(mapStateToProps, {fetchAllContainers})(Containers);