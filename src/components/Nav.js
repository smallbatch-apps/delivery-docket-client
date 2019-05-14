import React, {Fragment} from 'react';
import {Navbar} from 'react-bootstrap';
import {connect} from 'react-redux';

import NavItem from './NavItem';

const Nav = ({loginStatus}) => <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Docket Manager</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <ul className="navbar-nav mr-auto">
      <NavItem to="/" title="Home" />

      { loginStatus && <Fragment>
        <NavItem to="/dockets" title="Dockets" />
        <NavItem to="/detail" title="User Details" />
        <NavItem to="/login" title="Log Out" />
      </Fragment> }


      { !loginStatus && <Fragment>
        <NavItem to="/new-user" title="Create New User" / >
        <NavItem to="/login" title="Log In" />
      </Fragment> }

    </ul>
  </Navbar.Collapse>
</Navbar>

const mapStateToProps = ({loginStatus}) => ({loginStatus});

export default connect(mapStateToProps)(Nav);