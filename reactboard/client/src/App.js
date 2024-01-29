import React, { Component } from 'react';
import List from './components/List';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: 960,
    marginTop: theme.spacing(3),
    margin: 'auto',
    overflowX: 'auto'
  },
  progress: {
    margin: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      completed: 0
    };
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    return body;
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ users: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <div style={{ float: 'right', marginRight: '10px'}}>
            <Link to="/Write">
              <Button className={classes.button} variant="contained" color="primary">
                게시글 작성하기
              </Button>
            </Link>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '10%', fontWeight: 'bold', textAlign: 'center' }}>연번</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>제목</TableCell>
                <TableCell style={{ width: '14%', fontWeight: 'bold', textAlign: 'center' }}>작성자</TableCell>
                <TableCell style={{ width: '24%', fontWeight: 'bold', textAlign: 'center' }}>게시일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users ? (
                this.state.users.map(u => (
                  <List key={u.num} num={u.num} title={u.title} author={u.author} w_time={u.w_time} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);