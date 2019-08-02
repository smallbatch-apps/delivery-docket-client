import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

import {fetchAllContainers, fetchAllRobbings} from '../../redux/actions/actions';

class Container extends Component {

  state = {
    container: {
      id: 0,
      type: '',
      barcode: '',
      variety: ''
    },
    robbings: []
  }


  async componentDidMount() {
    if(!this.props.containers.length) {
      await this.props.fetchAllContainers();
    }

    if(!this.props.robbings.length) {
      await this.props.fetchAllRobbings();
    }

    const container = this.props.containers.find(({id}) => {
      return id === +this.props.match.params.id;
    });

    const robbings = this.props.robbings.filter(({container_id}) => {
      return container_id === +this.props.match.params.id
    });

    this.setState({container, robbings});
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  render() {
    const {container, robbings}  = this.state;

    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Container Details</h3>

      <dl className="row">

        <dt className="col-5 mb-2">Container Type</dt>
        <dd className="col-7">{container.type}</dd>

        <dt className="col-5">Barcode</dt>
        <dd className="col-7">{container.barcode}</dd>

        <dt className="col-5">Honey Variety</dt>
        <dd className="col-7">{container.variety}</dd>
      </dl>

      <h4>Robbings</h4>

      { robbings.length > 0 && <table className="table">
        <thead>
          <tr>
            <th>Postcode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {robbings.map(robbing => <tr key={robbing.id}>
          <td>{robbing.postcode}</td>
          <td>{format(new Date(robbing.created_at), 'dd-MM-yyyy')}</td>
        </tr>)}
        </tbody>
      </table> }

      { this.state.robbings.length === 0 && <div>No robbings found</div> }

      <Link to={`/containers/${this.state.container.id}/edit`} className="btn btn-primary btn-block mt-3">Edit Container</Link>

      <Link to={`/containers/${this.state.container.id}/robbings`} className="btn btn-primary btn-block mt-3">Attach Robbings To Container</Link>

    </Fragment>;
  }

}

const mapStateToProps = ({containers, robbings}) => ({containers, robbings});

export default connect(mapStateToProps, {fetchAllContainers, fetchAllRobbings})(Container);