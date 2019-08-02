import React from 'react';
import Octicon, {Package, ListOrdered, CloudUpload } from '@githubprimer/octicons-react';

export default ({isDocket, hasContainers, isLodged}) => <div className="row small my-3">
  <div className={`col text-center ${isDocket? 'text-success':'text-muted'}`}>
    <Octicon icon={Package} size="medium" /><br />
    docket
   </div>
  <div className={`col text-center ${hasContainers? 'text-success':'text-muted'}`}>
    <Octicon icon={ListOrdered} size="medium" /><br />
    containers
  </div>
  <div className={`col text-center ${isLodged ? 'text-success':'text-muted'}`}>
    <Octicon icon={CloudUpload} size="medium" /><br />
    lodgement
  </div>
</div>