import React,  {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import Nav from './Nav';
import Homepage from './Homepage';
import Dockets from './dockets/Dockets';
import Docket from './dockets/Docket';
import NewDocket from './dockets/NewDocket';
import Login from './login/Login';
import NewUser from './NewUser';
import Lot from './dockets/Lot';
import NewLot from './dockets/NewLot';
import Declaration from './dockets/Declaration';

export default () => <Fragment>
  <Nav />

  <div className="container py-3">

    <Switch>
      <Route path="/dockets/:id/lots/new" component={NewLot} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/dockets/new" component={NewDocket} />
      <Route exact path="/dockets/:docketId/lots/:id" component={Lot} />
      <Route path="/dockets/:id/lots/:docketId" component={Docket} />
      <Route exact path="/dockets/:id/declaration" component={Declaration} />
      <Route exact path="/dockets/:id" component={Docket} />
      <Route exact path="/dockets" component={Dockets} />
      <Route path="/login" component={Login} />
      <Route path="/new-user" component={NewUser} />
    </Switch>

  </div>
</Fragment>;