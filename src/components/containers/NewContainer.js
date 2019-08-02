import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome, faBadgeCheck } from '@fortawesome/pro-light-svg-icons';

import {fetchAllVarieties, createNewContainer} from '../../redux/actions/actions';
import Declaration from './Declaration';

import Quagga from 'quagga';

const containerTypes = ['Select Container Type', 'IBC', 'Drum', 'Block'];

class NewContainer extends Component {

  state = {
    lot_id: 0,
    barcode: '',
    container_type_id: 0,
    variety_id: 0,
    variety2_id: 0,
    declaration: null,
    hasValidDeclaration: false,
  }

  async componentDidMount() {
    if(!this.props.varieties.length) {
      await this.props.fetchAllVarieties();
    }


    const robbings = this.props.robbings.filter(robbing => !robbing.container_id);
    this.setState({robbings});



  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected(result) {
    console.log(result);
      //t//his.props.onDetected(result);
  }

  handleContainerTypeSelect = async ({target}) => {
    this.setState({container_type_id: +target.value});
  }

  handleVarietySelect = async ({target}) => this.setState({variety_id: +target.value});
  handleVariety2Select = async ({target}) => this.setState({variety2_id: +target.value});

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

  updateDeclaration = declaration => {
    this.setState({hasValidDeclaration: true, declaration});
  }

  handleScan = async () => {
    console.log('SCAN NOW');
  }

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>Create Container</h3>

      <div className="form-group">
        <label htmlFor="barcode">Barcode</label>
        <input type="text" name="barcode" className="form-control" onChange={this.handleBarcodeChange} placeholder="Barcode" />
      </div>
      <div id="interactive" className="viewport" ref={this.myref} />

      <div className="form-group">
        <label>Container Type</label>
        <select className="form-control" onChange={this.handleContainerTypeSelect}>
          { containerTypes.map((type, index) => <option key={index} value={index}>{type}</option>) }
        </select>
      </div>

      <div className="form-group">
        <label>Variety</label>
        <select className="form-control" onChange={this.handleVarietySelect}>
          <option>Choose The Variety</option>
          { this.props.varieties.map(variety => {
            return <option key={variety.id} value={variety.id}>{variety.variety}</option>
          }) }
        </select>
      </div>

      <div className="form-group">
        <label>Additional Variety</label>
        <select className="form-control" onChange={this.handleVariety2Select}>
          <option>No Second Variety</option>
          { this.props.varieties.map(variety => {
            return <option key={variety.id} value={variety.id}>{variety.variety}</option>
          }) }
        </select>
      </div>

      { !this.state.hasValidDeclaration && <Declaration updateDeclaration={this.updateDeclaration} /> }

      {this.state.hasValidDeclaration && <small className="form-text text-muted mb-3">
        <FontAwesomeIcon icon={faBadgeCheck} /> A declaration has been provided.
      </small>}



      <button className="btn btn-primary btn-block"
        disabled={!this.state.lot_id || !this.state.barcode || !this.state.hasValidDeclaration}
        onClick={this.handleSave}>Create</button>

    </Fragment>
  }

}

const mapStateToProps = ({containers, varieties, robbings, container_types}) => ({containers, varieties, robbings, container_types});

export default connect(mapStateToProps,  {fetchAllVarieties, createNewContainer})(NewContainer);