import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createNewLot } from '../../redux/actions/actions';

class NewLot extends Component {

  state = {
    variety_id: 0
  }

  handleSelectVariety = ({target}) => {
    this.setState({variety_id: target.value});
  }

  handleSave = async () => {
    await this.props.createNewLot({variety_id: this.state.variety_id});
    this.props.history.push('/lots');
  }

  render() {
    return <Fragment>
      <h3>Create Lot</h3>

      <select className="form-control" onChange={this.handleSelectVariety}>
        <option>Select variety</option>
        {this.props.varieties.map((variety, index) => <option key={index} value={index}>{variety}</option>)}
      </select>

      <button className="btn btn-primary btn-block mt-3" onClick={this.handleSave}>Create</button>

    </Fragment>
  }

}

const mapStateToProps = ({lots, varieties}) => ({lots, varieties});

export default connect(mapStateToProps, { createNewLot })(NewLot);