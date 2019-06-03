import React from 'react';
import Octicon, {Package, Verified, ListOrdered, CloudUpload } from '@githubprimer/octicons-react';

export default ({isDocket, hasLots, hasDeclaration, isLodged}) => <div className="row small my-3">
  <div className={`col text-center ${isDocket? 'text-success':'text-muted'}`}>
    <Octicon icon={Package} size="medium" /><br />
    docket
   </div>
  <div className={`col text-center ${hasLots? 'text-success':'text-muted'}`}>
    <Octicon icon={ListOrdered} size="medium" /><br />
    lots
  </div>
  <div className={`col text-center ${hasDeclaration > 0 ? 'text-success':'text-muted'}`}>
    <Octicon icon={Verified} size="medium" /><br />
    declaration
  </div>
  <div className={`col text-center ${isLodged ? 'text-success':'text-muted'}`}>
    <Octicon icon={CloudUpload} size="medium" /><br />
    lodgement
  </div>
</div>