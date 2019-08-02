import React, { Component, Fragment } from 'react';
import Form, { Label, Control, Group } from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { format } from 'date-fns/esm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import { createNewDocket } from '../../redux/actions/actions';



class NewDocket extends Component {

  state = {
    carrier: '',
    pickup_date: '',
    brand_number: '',
    freight_paid_by: ''
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.createNewDocket(this.state);
    //this.props.history.push('/dockets');
    window.location = '/dockets';
  }

  handleFieldChange = ({ target }) => this.setState({ [target.id]: target.value });
  handleChangeFreight = ({target}) => this.setState({freight_paid_by: target.value});
  handleDateChange = pickup_date => this.setState({ pickup_date });
  handleChange = ({target}) => this.setState({[target.id]: target.value});

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  render() {
    const disableSave = !this.state.carrier || !this.state.pickup_date || !this.state.brand_number || !this.state.freight_paid_by;
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Create Delivery Docket</h3>

      <Form onSubmit={this.handleSubmit}>

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
            <div className="form-group">
              <label htmlFor="brand_number">Brand Number</label>
              <input type="text" id="brand_number" name="brand_number"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.brand_number}/>
            </div>
          </div>
          <div className="col-sm">
            <Group controlId="pickup_date">
              <Label>Pickup Date</Label>
              <div>
                <DatePicker className="form-control"
                  id="pickup_date"
                  onChange={this.handleDateChange}
                  value={this.state.pickup_date ? format(this.state.pickup_date, 'd MMMM yyyy') : ''}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  autoComplete="false"
                />

              </div>
            </Group>
          </div>
          <div className="col-sm">
            <div className="form-group">
        <label htmlFor="carrier">Freight Paid By</label>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="freight_paid_by"
              value="Capilano"
              checked={this.state.freight_paid_by === 'Capilano'}
              onChange={this.handleChangeFreight}
              className="form-check-input"
            />
            Capilano
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="freight_paid_by"
              value="Keeper"
              checked={this.state.freight_paid_by === 'Keeper'}
              onChange={this.handleChangeFreight}
              className="form-check-input"
            />
            Keeper
          </label>
        </div>
      </div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={this.handleSubmit}
          disabled={disableSave}
        >
          Create Docket
        </button>

        <small className="form-text text-muted">
          You can add containers to the docket after it has been created.
        </small>

      </Form>

    </Fragment>
  }

}

const mapStateToProps = ({ loginStatus }) => ({ loginStatus });

export default connect(mapStateToProps, { createNewDocket })(NewDocket);