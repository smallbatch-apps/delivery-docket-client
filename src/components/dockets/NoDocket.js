import React from 'react';

export const noPermission = ({id}) => <div class="alert alert-danger" role="alert">
  You do not have permission to access this delivery docket.
</div>;

export const notFound = ({id}) => <div class="alert alert-danger" role="alert">
  A matching delivery docket was not found or has an error.
</div>;