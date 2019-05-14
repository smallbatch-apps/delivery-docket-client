import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format/';

export default ({item}) => {
  const pickupDate = new Date(item.pickUpDate);
  const lotLabel = item.lots.length === 1 ? 'lot' : 'lots';
  return <li className="list-group-item d-flex justify-content-between align-items-center">
    <Link to={`/dockets/${item._id}`}>Pickup on {`${format(pickupDate, 'MM/dd/yyyy')}`}</Link>

    <span className="badge badge-primary badge-pill">
      {`${item.lots.length} ${lotLabel}`}
    </span>
  </li>
}