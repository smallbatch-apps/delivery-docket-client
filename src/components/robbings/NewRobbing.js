import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createNewRobbing } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faCompassSlash } from '@fortawesome/pro-light-svg-icons';
import {getPostcodeFromLocation} from '../../services/maps';

class NewLot extends Component {

  state = {
    postcode: '',
    location: ''
  }

  handleRequestLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async ({coords:{latitude,longitude}}) => {
        const location = `${latitude},${longitude}`;
        const {data: {postcode}} = await getPostcodeFromLocation(location);
        this.setState({location, postcode});
      });
    }
  }

  handleChangePostcode = ({target}) => {
    this.setState({postcode: target.value});
  }

  handleSelectVariety = ({target}) => {
    this.setState({variety_id: target.value});
  }

  handleSave = async () => {
    await this.props.createNewRobbing(this.state);
    window.location = '/robbings';
  }

  render() {
    return <Fragment>
      <h3>Rob Hive</h3>

      <div className="form-group">
        <button className="btn btn-outline-primary btn-block mt-3"
          onClick={this.handleRequestLocation}>
          <FontAwesomeIcon icon={this.state.location ? faCompass : faCompassSlash} className="mr-3"/>
            { this.state.location ? 'Location found' : 'Get Current Position' }
        </button>
      </div>

      <div className="form-group">
        <input className="form-control"
          name="postcode"
          onChange={this.handleChangePostcode}
          value={this.state.postcode}
          placeholder="Enter Postcode"
        />
      </div>
      <button className="btn btn-primary btn-block mt-3" disabled={!this.state.location || !this.state.postcode} onClick={this.handleSave}>Save</button>

    </Fragment>
  }

}

const mapStateToProps = ({lots}) => ({lots});

export default connect(mapStateToProps, { createNewRobbing })(NewLot);