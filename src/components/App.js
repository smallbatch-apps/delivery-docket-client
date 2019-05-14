import React,  {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import Nav from './Nav';
import Homepage from './Homepage';
import Dockets from './dockets/Dockets';
import Docket from './dockets/Docket';
import NewDocket from './dockets/NewDocket';
import Login from './login/Login';
import NewUser from './NewUser';

export default () => <Fragment>
  <Nav />

  <div className="container py-3">

    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/dockets/new" component={NewDocket} />
      <Route path="/dockets/:id" component={Docket} />
      <Route path="/dockets" component={Dockets} />
      <Route path="/login" component={Login} />
      <Route path="/new-user" component={NewUser} />
    </Switch>

  </div>
</Fragment>;