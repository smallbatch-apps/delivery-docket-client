import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Form, { Label, Control, Group, Check } from 'react-bootstrap/Form';
// import DatePicker from "react-datepicker";

import { createLotOnDocket } from '../../redux/actions/actions'

import "react-datepicker/dist/react-datepicker.css";

class NewLot extends Component {

  state = {
    docketId: '',
    variety: '',
    apiaryNumber: '',
    waxPitBlock: '',
    drumPoly: '',
    ibc: '',
    pail: '',
    teSealInPlace: '',
    totalCount: '',
    yrMonthExtracted: '',
    nearestTown: '',
    markingsAndComments: '',
    otcUsed: ''
  };

  componentDidMount() {
    this.setState({ docketId: this.props.match.params.id });
  }

  handleFieldChange = ({ target }) => this.setState({ [target.id]: target.value });

  //handleDateChange = yrMonthExtracted => this.setState({yrMonthExtracted});

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.createLotOnDocket(this.state.docketId, this.state);
    this.props.history.push(`/dockets/${this.state.docketId}`);
  }

  render() {
    return <Fragment>
      <h3>Add New Lot To Docket </h3>
      <Form>

        <div className="row">
          <div className="col"><h5>Lot Details</h5></div>
        </div>
        <div className="row">
          <div className="col-sm">
            <Group controlId="variety">
              <Label>Floral Variety (or wax)</Label>
              <Control type="text"
                value={this.state.variety}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="apiaryNumber">
              <Label>Apiary Number</Label>
              <Control type="text"
                value={this.state.apiaryNumber}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>


        </div>
        <div className="row">
          <div className="col"><h5>Container Details</h5></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Group controlId="waxPitBlock">
              <Label>Wax Pit/Block</Label>
              <Control type="text"
                value={this.state.waxPitBlock}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="drumPoly">
              <Label>Drum - Poly</Label>
              <Control type="text"
                value={this.state.drumPoly}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="ibc">
              <Label>IBC</Label>
              <Control type="text"
                value={this.state.ibc}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="teSealInPlace">
              <Label>T/E Seal In Place</Label>
              <Control type="text"
                value={this.state.teSealInPlace}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>
          <div className="col-sm">
            <Group controlId="totalCount">
              <Label>Total Count</Label>
              <Control type="text"
                value={this.state.totalCount}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

        </div>

        <div className="row">
          <div className="col"><h5>Traceability Information</h5></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Group controlId="yrMonthExtracted">
              <Label>Year/Month Extracted </Label>
              <Control type="text"
                value={this.state.yrMonthExtracted}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="nearestTown">
              <Label>Nearest Town</Label>
              <Control type="text"
                value={this.state.nearestTown}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

        </div>

        <div className="row">
          <div className="col"><h5>Other Details</h5></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Group controlId="markingsAndComments">
              <Label>Barcodes, Markings and Comments</Label>
              <Control type="text"
                as="textarea"
                value={this.state.markingsAndComments}
                onChange={this.handleFieldChange}
              />
            </Group>
          </div>

          <div className="col-sm">
            <Group controlId="otcUsed">
              <Label>OTC Used</Label>
              <Fragment>
                <Check
                  type="radio"
                  id="otcUsed"
                  name="formHorizontalRadios"
                  label="Yes"
                  value={true}
                  onClick={this.handleFieldChange}
                />

                <Check
                  type="radio"
                  id="otcUsed"
                  name="formHorizontalRadios"
                  label="No"
                  value={false}
                  onClick={this.handleFieldChange}
                />
              </Fragment>

            </Group>
          </div>

        </div>

        <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Save Lot</button>
      </Form>
    </Fragment>
  }

}

const mapStateToProps = ({ loginStatus, dockets }) => ({ loginStatus, dockets });

export default connect(mapStateToProps, { createLotOnDocket })(NewLot);