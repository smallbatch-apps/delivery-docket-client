import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {fetchAllDockets} from '../../redux/actions/actions';

const Lot = props => {

  const { docketId, id } = props.match.params;
  if (!props.dockets.length) {
    //await props.
    //props.fetchAllDockets();
    window.location = '/dockets';
  }
  const docket = props.dockets.find(({_id}) => _id === docketId)

  const lot = docket.lots.find(({_id}) => _id === id);

  return <Fragment>

    <h3>Display Lot</h3>


    <dl className="row">

      <dt className="col-5">Variety</dt>
      <dd className="col-7">{lot.variety}</dd>

      <dt className="col-5">Apiary Number</dt>
      <dd className="col-7">{lot.apiaryNumber}</dd>

      <dt className="col-5">Wax Pit/Block</dt>
      <dd className="col-7">{lot.waxPitBlock}</dd>

      <dt className="col-5">Drum Poly</dt>
      <dd className="col-7">{lot.drumPoly}</dd>

      <dt className="col-5">IBC</dt>
      <dd className="col-7">{lot.ibc}</dd>

      <dt className="col-5">Pail</dt>
      <dd className="col-7">{lot.pail}</dd>

      <dt className="col-5">Extracted</dt>
      <dd className="col-7">{lot.yrMonthExtracted}</dd>

      <dt className="col-5">Nearest Town</dt>
      <dd className="col-7">{lot.nearestTown}</dd>

      <dt className="col-5">Comments</dt>
      <dd className="col-7">{lot.markingsAndComments}</dd>

    </dl>
  </Fragment>
};

const mapStateToProps = ({dockets}) => ({dockets});

export default connect(mapStateToProps, {fetchAllDockets})(Lot);