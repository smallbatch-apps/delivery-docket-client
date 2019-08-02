import React, { Component, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome, faCloudUpload, faEdit, faBallPile } from '@fortawesome/pro-light-svg-icons';

import StatusIcons from '../StatusIcons';

import { fetchSingleDocket, fetchAllDockets, lodgeDocket, fetchAllContainers } from '../../redux/actions/actions';

class Docket extends Component {

  state = { docket: null, edit: false, containers: [] }

  async componentDidMount() {
    const docketId = +this.props.match.params.id;
    if (!this.props.dockets.length) {
      await this.props.fetchAllDockets();
    }
    if (!this.props.containers.length) {
      await this.props.fetchAllContainers();
    }
    const docket = this.props.dockets.find(({ id }) => id === docketId);
    const containers = this.props.containers.filter(container => {
      return container.docket_id === docketId;
    });


    this.setState({ docket, containers });
  }

  handleClickBack = () => this.props.history.goBack();
  handleClickHome = () => this.props.history.push('/');

  render() {

    const { docket, containers } = this.state;

    if(!docket) { return ''; }

    if (typeof docket.receivedByDate === 'undefined') {
      docket.receivedByDate = '';
    }

    const hasDeclaration = docket.declaration && typeof docket.declaration !== 'undefined';
    const hasContainers = docket.containers.length !== 0;
    const isReady = hasDeclaration && hasContainers;
    const isLodged = Boolean(docket.lodgement_date);

    const formattedPickUpDate = docket.pickup_date
      ? format(new Date(docket.pickup_date), 'dd-MM-yyyy')
      : 'Not Entered';

    const formattedReceivedByDate = docket.received_by_date
      ? format(new Date(docket.received_by_date), 'dd-MM-yyyy')
      : 'Not Yet Received';

    const formattedLodgementDate = docket.lodgement_date
      ? format(new Date(docket.lodgement_date), 'dd-MM-yyyy')
      : 'Not Yet Lodged';

    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickBack}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3 className="mb-3">{this.state.edit ? 'Edit' : 'Display'} Docket</h3>

      <StatusIcons isDocket={true} hasContainers={hasContainers} hasDeclaration={hasDeclaration} isLodged={isLodged} />
      <Form onSubmit={this.handleSubmit}>

        <div className="row">
          <div className="col"><h5>Docket and Delivery Details</h5></div>
        </div>

        { !isLodged && <div className="row">
          <div className="col-6 mr-0">
            <Link to={`/dockets/${docket.id}/edit`} className="btn btn-primary btn-sm btn-block mr-0">
              <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit Delivery
            </Link>
          </div>
          <div className="col-6 ml-0">
            <button
              className="btn btn-success btn-sm btn-block mb-3 ml-0"
              onClick={this.handleSubmit} disabled={!isReady}
            >
              <FontAwesomeIcon icon={faCloudUpload} className="mr-1" /> Lodge Delivery
            </button>
          </div>
        </div> }


        <dl className="row small">
          <dt className="col-5">Carrier</dt>
          <dd className="col-7">{docket.carrier}</dd>

          <dt className="col-5">Freight Pay By</dt>
          <dd className="col-7">{docket.freight_paid_by}</dd>

          <dt className="col-5">Pick Up Date</dt>
          <dd className="col-7">{formattedPickUpDate}</dd>

          <dt className="col-5">Lodgement Date</dt>
          <dd className="col-7">{formattedLodgementDate}</dd>

          <dt className="col-5">Received By CHL</dt>
          <dd className="col-7">{formattedReceivedByDate}</dd>
        </dl>

        <div className="row">
          <div className="col"><h5>Containers on docket</h5></div>
        </div>



        <div className="row mb-3">
          <div className="col">
            <div className="list-group">
              { hasContainers && <table className="table table-sm mb-0">
                <thead>
                  <tr>
                    <th scope="col">Variety</th>
                    <th scope="col">Barcode</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map(container => <tr key={container.id}>
                    <td>{container.variety}</td>
                    <td>{container.barcode}</td>
                    <td className="text-right"><Link to={`/containers/${container.id}`} >View </Link></td>
                  </tr>)}
                </tbody>
              </table> }

              { !isLodged && <Link to={`/dockets/${docket.id}/containers`} className="btn btn-outline-info btn-sm mt-1">
                <FontAwesomeIcon icon={faBallPile} className="mr-1" /> manage containers
              </Link> }

              {!hasContainers && <div>No containers found</div> }

            </div>

          </div>
        </div>




      </Form>
    </Fragment>
  }

}

const mapStateToProps = ({ dockets, containers }) => ({ dockets, containers });

export default connect(mapStateToProps, { fetchSingleDocket, fetchAllDockets, lodgeDocket, fetchAllContainers })(Docket);