import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavItem = props => {
  const isActive = props.location.pathname === props.to;

  return <li className={isActive ? 'nav-item active' : 'nav-item'}>
    <Link className="nav-link" to={props.to}>{props.title}</Link>
  </li>
}

export default withRouter(NavItem);