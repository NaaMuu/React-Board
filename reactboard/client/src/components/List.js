import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';

class List extends React.Component {
  w_timestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {
    const w_timestamp = this.w_timestamp(this.props.w_time);
    return (
      <TableRow>
        <TableCell style={{ textAlign: 'center' }}>{this.props.num}</TableCell>
        <TableCell>
          <Link to={`/View/${this.props.num}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
            {this.props.title}
          </Link>
        </TableCell>
        <TableCell>{this.props.author}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{w_timestamp}</TableCell>
      </TableRow>
    );
  }
}

export default List;