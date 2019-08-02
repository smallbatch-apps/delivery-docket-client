import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format/';

export default ({item}) => {
  const pickupDate = new Date(item.pickup_date);
  const containerLabel = item.containers.length === 1 ? 'container' : 'containers';
  return <li className="list-group-item d-flex justify-content-between align-items-center">
    <Link to={`/dockets/${item.id}`}>Pickup on {`${format(pickupDate, 'dd-MM-yyyy')}`}</Link>

    <span className="badge badge-primary badge-pill">
      {`${item.containers.length} ${containerLabel}`}
    </span>
  </li>
}