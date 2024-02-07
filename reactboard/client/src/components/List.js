import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Timestamp from './Timestamp';
import withStyles from './withStyles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };
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
      <Paper className={classes.root}>
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
            {currentPostPage.map((post) => (
              <TableRow key={post.num}>
                <TableCell style={{ textAlign: 'center' }}>{post.num}</TableCell>
                <TableCell><Link to={`/View/${post.num}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>{post.title}</Link></TableCell>
                <TableCell style={{ textAlign: 'center' }}>{post.author}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{Timestamp(post.w_time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {posts && (
          <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
        )}
      </Paper>
    );
  }
}

export default withStyles(List);