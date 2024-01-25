import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import Timestamp from './Timestamp';
import withStyles from './withStyles';

class List extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell style={{ textAlign: 'center' }}>{this.props.num}</TableCell>
        <TableCell><Link to={`/View/${this.props.num}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>{this.props.title}</Link></TableCell>
        <TableCell style={{ textAlign: 'center' }}>{this.props.author}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{Timestamp(this.props.w_time)}</TableCell>
      </TableRow>
    );
  }
}

export default withStyles(List);