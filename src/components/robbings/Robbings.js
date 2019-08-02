import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {format} from 'date-fns';
import { fetchAllRobbings } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleLeft, faHome } from '@fortawesome/pro-light-svg-icons';

class Robbings extends Component {

  state = {robbings:[]}

  async componentDidMount() {
    if(!this.props.robbings.length) {
      await this.props.fetchAllRobbings();
    }

    const robbings = this.props.robbings;
    this.setState({robbings});
  }

  handleClickHome = () => this.props.history.push('/');

  render() {
    return <Fragment>

      <div className="mb-3">
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faChevronDoubleLeft} /> back</div>
        <div className="btn btn-light btn-lg mr-2" onClick={this.handleClickHome}><FontAwesomeIcon icon={faHome} /></div>
      </div>

      <h3>All Robbings</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Postcode</th>
          </tr>
        </thead>
        <tbody>
          {this.state.robbings.map(robbing => {
            return <tr key={robbing.id}>
              <td>{format(new Date(robbing.created_at), 'dd-MM-yyyy')}</td>
              <td>{robbing.postcode}</td>
            </tr>}
          )}
          <tr>
            <td colSpan="3">
            <Link to="/robbings/new" className="btn btn-primary btn-block">Rob Hive</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  }

}

const mapStateToProps = ({robbings}) => ({robbings});

export default connect(mapStateToProps, {fetchAllRobbings})(Robbings);