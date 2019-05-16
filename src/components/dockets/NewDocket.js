import React, { Component, Fragment } from 'react';
import Form, {Label, Control, Group, Check } from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { createNewDocket } from '../../redux/actions/actions';
import { connect } from 'react-redux';


class NewDocket extends Component {

  state = {
    carrier: '',
    pickUpDate: '',
    brandNumber: '',
    freightPayableBy: ''
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.createNewDocket(this.state);
    this.props.history.push('/dockets');
  }

  handleFieldChange = ({target}) => this.setState({[target.id]: target.value});

  handleDateChange = pickUpDate => this.setState({pickUpDate});

  render() {
    return <Fragment>
      <h3>Create Delivery Docket</h3>

      <Form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col"><h5>Delivery Details</h5></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Group controlId="carrier">
              <Label>Carrier</Label>
              <Control type="text"
                placeholder="Enter carrier"
                autoComplete="form-carrier"
                value={this.state.carrier}
                onChange={this.handleFieldChange}
                />
            </Group>
          </div>
          <div className="col-sm">
            <Group controlId="brandNumber">
              <Label>Brand Number</Label>
              <Control
                type="text"
                placeholder="Brand Number"
                autoComplete="brandnumber"
                value={this.state.brandNumber}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>
          <div className="col-sm">
            <Group controlId="pickUpDate">
              <Label>Pickup Date</Label>
              <div>
              <DatePicker className="form-control"
                id="pickUpDate"
                selected={this.state.pickUpDate}
                onChange={this.handleDateChange}
                dateFormat="dd/MM/yyyy"
              />

              </div>

              {/* <DatePicker id="example-datepicker" value={this.state.pickUpDate} onChange={this.handleFieldChange} /> */}
              {/* <Control
                type="text"
                placeholder="Pickup Date"
                autoComplete="pickup-date"
                value={this.state.pickUpDate}
                onChange={this.handleFieldChange}
              /> */}
            </Group>
          </div>
          <div className="col-sm">
            <Group controlId="freightPayableBy">
              <Label>Freight payable by</Label>
              <Fragment>
              <Check
                type="radio"
                id="freightPayableBy"
                name="formHorizontalRadios"
                label="chl"
                value="chl"
              />

              <Check
                type="radio"
                id="freightPayableBy"
                name="formHorizontalRadios"
                label="shareholder"
                value="shareholder"
              />
              </Fragment>

            </Group>
          </div>
        </div>



        <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Create Docket</button>

        <small className="form-text text-muted">
          You can add lots and Quality Assurance delaration after you have created this docket.
        </small>

      </Form>

    </Fragment>
  }

}

const mapStateToProps = ({loginStatus}) => ({loginStatus});

export default connect(mapStateToProps, {createDocket})(NewDocket);