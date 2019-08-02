import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import format from 'date-fns/format';
import {fetchAllRobbings, editRobbing} from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome, faCheckSquare, faSquare } from '@fortawesome/pro-light-svg-icons';

class ContainerRobbings extends Component {

  state = {
    currentRobbings: [],
    unassociatedRobbings: [],
    changes: []
  }

  async componentDidMount() {
    if(!this.props.robbings.length) {
      await this.props.fetchAllRobbings();
    }

    const currentRobbings = this.props.robbings
      .filter(({container_id}) => {
        return container_id === +this.props.match.params.id;
      })
      .map(robbing => ({...robbing, checked: true}));

    const unassociatedRobbings = this.props.robbings
      .filter(({container_id}) => !container_id)
      .map(robbing => ({...robbing, checked: false}));

    this.setState({currentRobbings, unassociatedRobbings});
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  handleSave = async () => {
    const allRobbings = [...this.state.currentRobbings, ...this.state.unassociatedRobbings];
    this.state.changes.forEach(async changeId => {
      const changedRobbing = allRobbings.find(({id}) => id === changeId);
      const container_id = changedRobbing.checked ? this.props.match.params.id : 0;
      await this.props.editRobbing(changeId, {container_id});
    });

    window.location = `/containers/${this.props.match.params.id}`;
  }

  handleCheckRobbing = (type, id) => {
    this.setState({[type]: this.state[type].map(rob => {
      if(rob.id === id) rob.checked = !rob.checked;
      return rob;
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

      <h3>Attach Robbings</h3>

      { this.state.currentRobbings.length > 0 && <Fragment>
        <h4>Current Robbings</h4>

        <p>These robbings are attached to this container.</p>

        <ul className="list-group mb-3">
          {this.state.currentRobbings.map(robbing => <li
            className="list-group-item" key={robbing.id}
            onClick={() => this.handleCheckRobbing('currentRobbings', robbing.id)}>
              <FontAwesomeIcon icon={robbing.checked ? faCheckSquare : faSquare} className="mr-3" />
              {format(new Date(robbing.created_at), 'dd-MM-yyyy')} from postcode {robbing.postcode}
          </li>)}
        </ul>
      </Fragment>}

      { this.state.currentRobbings.length === 0 && <Fragment>
        <h4>There are no Robbings attached</h4>

        <p>When you attach them from the below unattached robbings they will be listed here.</p>
      </Fragment> }


      { this.state.unassociatedRobbings.length > 0 && <Fragment>
        <h4>Unattached Robbings</h4>

        <p>Select all of the hive robbings that will be in this container</p>

        <ul className="list-group">
          {this.state.unassociatedRobbings.map(robbing => <li
            className="list-group-item" key={robbing.id}
            onClick={() => this.handleCheckRobbing('unassociatedRobbings', robbing.id)}>
              <FontAwesomeIcon icon={robbing.checked ? faCheckSquare : faSquare} className="mr-3" />
              {format(new Date(robbing.created_at), 'dd-MM-yyyy')} from postcode {robbing.postcode}
          </li>)}
        </ul>
      </Fragment> }

      { this.state.unassociatedRobbings.length === 0 && <Fragment>
        <h4>There are no unattached Robbings</h4>

        <p>You will need to create some robbings in order to attach them to a container.</p>
      </Fragment> }

      <div className="form-group">
        <button className="btn btn-primary btn-block mt-3" disabled={this.state.changes.length === 0} onClick={this.handleSave}>
          Save robbing attachments
        </button>
      </div>
    </Fragment>
  }

}

const mapStateToProps = ({robbings, containers}) => ({robbings, containers});

export default connect(mapStateToProps, {fetchAllRobbings, editRobbing})(ContainerRobbings);