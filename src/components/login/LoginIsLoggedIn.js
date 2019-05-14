import React, { Fragment } from 'react';

export default props => <Fragment>
  <h3>Logged In</h3>

  <p>You are currently logged into the application. Would you like to log out now?</p>

  <button onClick={props.logOutUser} className="btn btn-primary btn-block">Log Out</button>
</Fragment>;