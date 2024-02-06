import React, { Component } from 'react';
import List from './components/List';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Pagination from './components/Pagination';

const styles = theme => ({
  root: {
    width: 960,
    marginTop: theme.spacing(3),
    margin: 'auto',
    overflowX: 'auto'
  },
  button: {
    margin: theme.spacing(1)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      currentPage: 1
    };
  }

  callApi = async () => {
    const response = await fetch('/api/posts');
    const body = await response.json();
    return body;
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ posts: res }))
      .catch(err => console.log(err));
  }

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { classes } = this.props;
    const { posts, currentPage } = this.state;
    
    const totalPage = Math.ceil((posts ? posts.length : 0) / 10);
    const lastPostPage = currentPage * 10;
    const firstPostPage = lastPostPage - 10;
    const currentPostPage = posts ? posts.slice(firstPostPage, lastPostPage) : null;

    return (
      <div>
        <Paper className={classes.root}>
          <div style={{ float: 'right', marginRight: '10px' }}>
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
              {currentPostPage ? (
                currentPostPage.map(u => (
                  <List key={u.num} num={u.num} title={u.title} author={u.author} w_time={u.w_time} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" align="center"/>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {posts && (
            <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);