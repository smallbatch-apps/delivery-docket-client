import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';
import DatePicker from "react-datepicker";
import {fetchAllDockets, createNewDocket} from '../../redux/actions/actions';

class EditDocket extends Component {

  state = {
    id: 0,
    brand_number: '',
    freight_paid_by: '',
    carrier: '',
    pickup_date: ''
  }

  async componentDidMount() {
    if(!this.props.dockets.length) {
      await this.props.fetchAllDockets();
    }

    const thisDocket = this.props.dockets.find(({id}) => id === +this.props.match.params.id);

    this.setState({...this.state, ...thisDocket});
  }


  handleSave = async () => {
    await this.props.editDocket(this.state.id, this.state);

    this.props.history.push(`/dockets/${this.state.id}`);
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  handleChange = ({target}) => this.setState({[target.id]: target.value});

  handleChangeFreight = ({target}) => this.setState({freight_paid_by: target.value});

  render() {
    return <Fragment>
      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Edit Docket</h3>

      <div className="form-group">
        <label htmlFor="brand_number">Brand Number</label>
        <input type="text" id="brand_number" name="brand_number"
         className="form-control"
         onChange={this.handleChange}
         value={this.state.brand_number}/>
      </div>

      <div className="form-group">
        <label htmlFor="carrier">Carrier</label>
        <input type="text" id="carrier" name="carrier"
         className="form-control"
         onChange={this.handleChange}
         value={this.state.carrier}/>
      </div>

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

      <div className="form-group">
        <label htmlFor="pickup_date">Pickup Date</label>
        <DatePicker className="form-control"
          id="pickup_date"
          selected={this.state.pickup_date}
          onChange={this.handleDateChange}
          minDate={new Date()}
          dateFormat="dd-MM-yyyy"
          autoComplete="false"
        />

      </div>

      <button className="btn btn-primary btn-block"
        onClick={this.handleSave}>Update</button>

    </Fragment>
  }

}

const mapStateToProps = ({ dockets }) => ({ dockets });

export default connect(mapStateToProps, {fetchAllDockets, createNewDocket})(EditDocket);