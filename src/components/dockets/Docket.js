import React, { Component, Fragment } from 'react';
import Form, {Label, Control, Group, Check } from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchSingleDocket} from '../../redux/actions/actions';

class Docket extends Component {

  state = { docket: null, edit: false }

  async componentDidMount() {
    const id = this.props.match.params.id;
    let docket = this.props.fullDockets[id];

    if (docket === undefined) {
      await this.props.fetchSingleDocket(id);
      docket = this.props.fullDockets[id];
    }

    this.setState({docket});
  }

  toggleEditing = () => this.setState({edit: !this.state.edit})

  handleSubmit = event => {

  }

  handleFieldChange = ({target}) => {
    const docket = {...this.state.docket, [target.id]: target.value}
    this.setState({docket});
  }

  render() {
    const {docket} = this.state;

    if (!docket) {
      return '';
    }

    return <Fragment>
      <h3>{this.state.edit ? 'Edit' : 'Display'} Docket</h3>

      <Form onSubmit={this.handleSubmit}>
      <div className="row">
        <div className="col"><h5>Delivery Details</h5></div>
      </div>
      <div className="row">
        <div className="col-sm">
          <Group controlId="carrier">
            <Label>Carrier</Label>
            <Control type="text"
              plaintext={!this.state.edit}
              placeholder="Enter carrier"
              autoComplete="form-carrier"
              value={docket.carrier}
              onChange={this.handleFieldChange}
              />
          </Group>
        </div>
        <div className="col-sm">
          <Group controlId="pickUpDate">
            <Label>Pickup Date</Label>
            <Control
              type="text"
              plaintext={!this.state.edit}
              placeholder="Pickup Date"
              autoComplete="pickup-date"
              value={docket.pickUpDate}
              onChange={this.handleFieldChange}
            />
          </Group>
        </div>
        <div className="col-sm">
          <Group controlId="freightPayableBy">
            <Label>Freight payable by</Label>
            {this.state.edit && <Fragment>
            <Check
              type="radio"
              id="freightPayableBy-chl"
              label="chl"
              value="chl"
            />

            <Check
              type="radio"
              id="freight-paid-shareholder"
              label="shareholder"
              value="shareholder"
            />
            </Fragment> }

            {!this.state.edit && <Control
              type="text"
              plaintext
              autoComplete="pickup-date"
              value={docket.freightPayableBy}
              onChange={this.handleFieldChange}
            />}
          </Group>
        </div>
      </div>


      <div className="row">
        <div className="col"><h5>Lots on docket</h5></div>
      </div>
      <div className="row">
        <div className="col">
          <div className="list-group">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Variety</th>
                  <th scope="col">Extracted</th>
                  <th scope="col">Count</th>
                  <th scope="col">Comments</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {docket.lots.map(lot=> <tr key={lot._id}>
                  <td>{lot.variety}</td>
                  <td>{lot.yrMonthExtracted}</td>
                  <td>{lot.totalCount}</td>
                  <td>{lot.markingsAndComments}</td>
                  <td><Link to={`/dockets/${docket._id}/lot/${lot._id}`} >View</Link></td>
                </tr>)}

              </tbody>
            </table>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          Office Use: Received
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <Group controlId="receivedByDate">
            <Label>Received By CHL</Label>
            <Control
              type="text"
              plaintext={!this.state.edit}
              placeholder="received by chl"
              autoComplete="received-date"
              value={docket.receivedByDate?docket.receivedByDate:'Not Applicable'}
              onChange={this.handleFieldChange}
            />
          </Group>
        </div>

      </div>

      <div className="row">
        <div className="col">
          <h4>Declaration</h4>

          <p>{docket.declaration ? 'Declaration set' : 'No declaration present'}</p>


          { <Link to={`/dockets/${docket._id}/declaration`} className="" >View Declarations</Link> }
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary btn-block mt-3" onClick={this.toggleEditing} >Edit This Docket</button>
        </div>
      </div>

      </Form>
    </Fragment>
  }

}

const mapStateToProps = ({fullDockets}) => ({fullDockets});

export default connect(mapStateToProps, {fetchSingleDocket})(Docket);