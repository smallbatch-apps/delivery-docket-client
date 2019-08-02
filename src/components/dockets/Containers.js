import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import format from 'date-fns/format';
import {fetchAllContainers, editContainer} from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome, faCheckSquare, faSquare } from '@fortawesome/pro-light-svg-icons';

class DocketContainers extends Component {

  state = {
    currentContainers: [],
    unassociatedContainers: [],
    changes: []
  }

  async componentDidMount() {
    if(!this.props.containers.length) {
      await this.props.fetchAllContainers();
    }

    const currentContainers = this.props.containers
      .filter(({container_id}) => {
        return container_id === +this.props.match.params.id;
      })
      .map(container => ({...container, checked: true}));

    const unassociatedContainers = this.props.containers
      .filter(({container_id}) => !container_id)
      .map(container => ({...container, checked: false}));

    this.setState({currentContainers, unassociatedContainers});
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  handleSave = async () => {
    const allContainers = [...this.state.currentContainers, ...this.state.unassociatedContainers];
    this.state.changes.forEach(async changeId => {
      const changedContainer = allContainers.find(({id}) => id === changeId);
      const docket_id = changedContainer.checked ? this.props.match.params.id : 0;
      await this.props.editContainer(changeId, {docket_id});
    });

    window.location = `/dockets/${this.props.match.params.id}`;
  }

  handleCheckContainer = (type, id) => {
    this.setState({[type]: this.state[type].map(cont => {
      if(cont.id === id) cont.checked = !cont.checked;
      return cont;
    })});

    if(!this.state.changes.includes(id)) {
      this.setState({changes: [...this.state.changes, id]});
    }

  }

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3 className="mb-3">Attach Containers</h3>

      { this.state.currentContainers.length > 0 && <Fragment>
        <h4>Current Containers</h4>

        <p>These Containers are attached to this container.</p>

        <ul className="list-group mb-3">
          {this.state.currentContainers.map(Container => <li
            className="list-group-item" key={Container.id}
            onClick={() => this.handleCheckContainer('currentContainers', Container.id)}>
              <FontAwesomeIcon icon={Container.checked ? faCheckSquare : faSquare} className="mr-3" />
              {format(new Date(Container.created_at), 'dd-MM-yyyy')} from postcode {Container.postcode}
          </li>)}
        </ul>
      </Fragment> }

      { this.state.currentContainers.length === 0 && <Fragment>
        <h4>There are no containers attached</h4>

        <p>When you attach them from the below unattached containers they will be listed here.</p>
      </Fragment> }


      { this.state.unassociatedContainers.length > 0 && <Fragment>
        <h4>Unattached Containers</h4>

        <p>Select all of the hive containers that will be in this container</p>

        <ul className="list-group">
          {this.state.unassociatedContainers.map(Container => <li
            className="list-group-item" key={Container.id}
            onClick={() => this.handleCheckContainer('unassociatedContainers', Container.id)}>
              <FontAwesomeIcon icon={Container.checked ? faCheckSquare : faSquare} className="mr-3" />
              {format(new Date(Container.created_at), 'dd-MM-yyyy')} from postcode {Container.postcode}
          </li>)}
        </ul>
      </Fragment> }

      { this.state.unassociatedContainers.length === 0 && <Fragment>
        <h4>There are no unattached Containers</h4>

        <p>You will need to create some Containers in order to attach them to a container.</p>
      </Fragment> }

      <div className="form-group mb-0">
        <button className="btn btn-primary btn-block mt-3" disabled={this.state.changes.length === 0} onClick={this.handleSave}>
          Save Container attachments
        </button>
      </div>
    </Fragment>
  }

}

const mapStateToProps = ({dockets, containers}) => ({dockets, containers});

export default connect(mapStateToProps, {fetchAllContainers, editContainer})(DocketContainers);