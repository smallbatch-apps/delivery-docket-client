import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {format} from 'date-fns';
import { fetchAllLots } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

class Lots extends Component {

  state = {lots:[]}

  async componentDidMount() {
    await this.props.fetchAllLots();
  }

  handleClickHome = () => this.props.history.push('/');

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>All Lots</h3>

      <table className="table">
        <tbody>
          {this.props.lots.map(lot => {
            return <tr key={lot.id}>
              <td>{this.props.varieties[lot.variety_id]}</td>
              <td className="text-right">{format(new Date(lot.created_at), 'yyyy/MM/dd')}</td>
              <td className="text-right">
                <Link to={`/lots/${lot.id}`}>&raquo;</Link>
              </td>
            </tr>}
          )}
          <tr>
            <td colSpan="3">
            <Link to="/lots/new" className="btn btn-primary btn-block">Create New Lot</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  }

}

const mapStateToProps = ({lots, varieties}) => ({lots, varieties});

export default connect(mapStateToProps, {fetchAllLots})(Lots);