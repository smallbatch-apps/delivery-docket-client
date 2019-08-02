import React,  {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import Nav from './Nav';
import Homepage from './Homepage';
import Dockets from './dockets/Dockets';
import Docket from './dockets/Docket';
import NewDocket from './dockets/NewDocket';
import EditDocket from './dockets/EditDocket';
import DocketContainers from './dockets/Containers';

import Login from './login/Login';
import NewUser from './NewUser';

import Container from './containers/Container';
import Containers from './containers/Containers';
import NewContainer from './containers/NewContainer';
import EditContainer from './containers/EditContainer';
import ContainerRobbings from './containers/Robbings';

import Robbing from './robbings/Robbing';
import Robbings from './robbings/Robbings';
import NewRobbing from './robbings/NewRobbing';
import EditRobbing from './robbings/EditRobbing';

export default () => <Fragment>
  <Nav />

  <div className="container py-3">

    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/dockets" component={Dockets} />
      <Route exact path="/dockets/new" component={NewDocket} />
      <Route exact path="/dockets/:id" component={Docket} />
      <Route exact path="/dockets/:id/edit" component={EditDocket} />
      <Route exact path="/dockets/:id/containers" component={DocketContainers} />

      <Route exact path="/containers" component={Containers} />
      <Route exact path="/containers/new" component={NewContainer} />
      <Route exact path="/lots/:lot_id/containers/new" component={NewContainer} />
      <Route exact path="/containers/:id" component={Container} />
      <Route path="/containers/:id/edit" component={EditContainer} />
      <Route exact path="/containers/:id/robbings" component={ContainerRobbings} />

      <Route exact path="/robbings" component={Robbings} />
      <Route exact path="/robbings/new" component={NewRobbing} />
      <Route exact path="/robbings/:id" component={Robbing} />
      <Route path="/robbings/:id/edit" component={EditRobbing} />

      <Route path="/login" component={Login} />
      <Route path="/new-user" component={NewUser} />
    </Switch>

  </div>
</Fragment>;