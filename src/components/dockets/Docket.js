import React, { Component, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Octicon, { PlusSmall, CloudUpload } from '@githubprimer/octicons-react';

import StatusIcons from '../StatusIcons';

import { fetchSingleDocket, fetchAllDockets, lodgeDocket } from '../../redux/actions/actions';

class Docket extends Component {

  state = { docket: null, edit: false }

  async componentDidMount() {
    const docketId = this.props.match.params.id;
    if (!this.props.dockets.length) {
      await this.props.fetchAllDockets();
    }
    const docket = this.props.dockets.find(({ _id }) => _id === docketId);
    this.setState({ docket });
  }

  toggleEditing = () => this.setState({ edit: !this.state.edit })

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.lodgeDocket(this.state.docket._id);
    const docket = this.props.dockets.find(({_id}) => _id === this.state.docket._id);
    this.setState({docket});
  }

  handleFieldChange = ({ target }) => {
    const docket = { ...this.state.docket, [target.id]: target.value }
    this.setState({ docket });
  }

  render() {
    const { docket } = this.state;

    if (!docket) {
      return '';
    }

    if (typeof docket.receivedByDate === 'undefined') {
      docket.receivedByDate = '';
    }

    const hasDeclaration = docket.declaration && typeof docket.declaration !== 'undefined';
    const hasLots = docket.lots.length !== 0;
    const isReady = hasDeclaration && hasLots;
    const isLodged = Boolean(docket.lodgementDate);

    const formattedPickUpDate = docket.pickUpDate
      ? format(new Date(docket.pickUpDate), 'dd-MM-yyyy')
      : 'Not Entered';

    const formattedReceivedByDate = docket.receivedByDate
      ? format(new Date(docket.receivedByDate), 'dd-MM-yyyy')
      : 'Not Yet Received';

    const formattedLodgementDate = docket.lodgementDate
      ? format(new Date(docket.lodgementDate), 'dd-MM-yyyy')
      : 'Not Yet Lodged';

    return <Fragment>
      <h3 className="mb-3">{this.state.edit ? 'Edit' : 'Display'} Docket</h3>

      <StatusIcons isDocket={true} hasLots={hasLots} hasDeclaration={hasDeclaration} isLodged={isLodged} />

      <Form onSubmit={this.handleSubmit}>

        <div className="row">
          <div className="col"><h5>Docket and Delivery Details</h5></div>
        </div>

        <dl className="row small">
          <dt className="col-5">Carrier</dt>
          <dd className="col-7">{docket.carrier}</dd>

          <dt className="col-5">Freight Pay By</dt>
          <dd className="col-7">{docket.freightPayableBy}</dd>

          <dt className="col-5">Pick Up Date</dt>
          <dd className="col-7">{formattedPickUpDate}</dd>

          <dt className="col-5">Lodgement Date</dt>
          <dd className="col-7">{formattedLodgementDate}</dd>

          <dt className="col-5">Received By CHL</dt>
          <dd className="col-7">{formattedReceivedByDate}</dd>
        </dl>

        <div className="row">
          <div className="col"><h5>Lots on docket</h5></div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="list-group">
              {hasLots && <table className="table table-sm mb-0">
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
                  {docket.lots.map(lot => <tr key={lot._id}>
                    <td>{lot.variety}</td>
                    <td>{lot.yrMonthExtracted}</td>
                    <td>{lot.totalCount}</td>
                    <td>{lot.markingsAndComments}</td>
                    <td><Link to={`/dockets/${docket._id}/lots/${lot._id}`} >View</Link></td>
                  </tr>)}
                </tbody>
              </table> }
              <div className="row">

                <div className="col">
                  <Link to={`/dockets/${docket._id}/lots/new`} className="btn btn-outline-info btn-sm btn-block">
                    <Octicon icon={PlusSmall} /> Add Lot
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="row">
          <div className="col">
            <h5>Declaration</h5>

            <div className="row">
              <div className="col">
                { !hasDeclaration && <Link to={`/dockets/${docket._id}/declaration`} className="btn btn-outline-info btn-sm btn-block" >
                  <Octicon icon={PlusSmall} /> Add Declaration
                </Link> }

                { hasDeclaration && <small>Declaration is found</small> }
              </div>
            </div>
          </div>
        </div>

        { !isLodged && <div className="row">
          <div className="col">
            <button
              className="btn btn-success btn-block mt-3"
              onClick={this.handleSubmit} disabled={!isReady}
            >
              <Octicon icon={CloudUpload} /> Lodge Delivery Docket
          </button>
          </div>
        </div> }

      </Form>
    </Fragment>
  }

}

const mapStateToProps = ({ dockets }) => ({ dockets });

export default connect(mapStateToProps, { fetchSingleDocket, fetchAllDockets, lodgeDocket })(Docket);