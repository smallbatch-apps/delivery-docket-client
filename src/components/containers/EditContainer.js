import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcodeRead, faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

import {fetchAllVarieties, fetchAllRobbings, fetchAllContainers} from '../../redux/actions/actions';

const containerTypes = ['Select Container Type', 'IBC', 'Drum', 'Block'];

class EditContainer extends Component {

  state = {
    barcode: '',
    container_type_id: 0,
    robbings: []
  }

  async componentDidMount() {
    if(!this.props.varieties.length) {
      await this.props.fetchAllContainers();
    }
    if(!this.props.varieties.length) {
      await this.props.fetchAllVarieties();
    }
    if(!this.props.varieties.length) {
      await this.props.fetchAllRobbings();
    }
    const thisContainer = this.props.containers.find(({id}) => id === +this.props.match.params.id);
    this.setState({...this.state, ...thisContainer});
  }

  handleContainerTypeSelect = async ({target}) => {
    this.setState({container_type_id: +target.value});
  }

  handleSave = async () => {
    await this.props.createNewContainer({
      lot_id: this.state.lot_id,
      barcode: this.state.barcode,
      container_type_id: +this.state.container_type_id,
      declaration: this.state.declaration
    });

    this.props.history.push(`/lots/${this.state.lot_id}`);
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  handleBarcodeChange = ({target}) => this.setState({barcode: target.value});

  handleVarietySelect = async ({target}) => this.setState({variety_id: +target.value});
  handleVariety2Select = async ({target}) => this.setState({variety2_id: +target.value});

  handleScan = async () => {
    console.log('SCAN NOW');
  }


  render() {
    return <Fragment>
      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Edit Container</h3>

      <div className="form-group">
        <div className="input-group">
          <input type="text" name="barcode" className="form-control" onChange={this.handleBarcodeChange} value={this.state.barcode} placeholder="Barcode"  />
          <div className="input-group-append">
            <div className="input-group-text" onClick={this.handleScan}><FontAwesomeIcon icon={faBarcodeRead} /></div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <select className="form-control" onChange={this.handleContainerTypeSelect} value={this.state.container_type_id}>
          { containerTypes.map((type, index) => <option key={index} value={index}>{type}</option>) }
        </select>
      </div>

      <div className="form-group">
        <select className="form-control" onChange={this.handleVarietySelect} value={this.state.variety_id}>
          <option>Choose The Variety</option>
          { this.props.varieties.map(variety => {
            return <option key={variety.id} value={variety.id}>{variety.variety}</option>
          }) }
        </select>
      </div>

      <div className="form-group">
        <select className="form-control" onChange={this.handleVariety2Select} value={this.state.variety2_id}>
          <option>No Second Variety</option>
          { this.props.varieties.map(variety => {
            return <option key={variety.id} value={variety.id}>{variety.variety}</option>
          }) }
        </select>
      </div>

      <button className="btn btn-primary btn-block"
        onClick={this.handleSave}>Update</button>

    </Fragment>
  }

}

const mapStateToProps = ({ containers, robbings, varieties }) => ({ containers, robbings, varieties });

export default connect(mapStateToProps, {fetchAllVarieties, fetchAllRobbings, fetchAllContainers})(EditContainer);