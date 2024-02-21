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

class Delete extends Component {
  constructor(props) { // 삭제할 값들의 초기 상태
    super(props);
    this.state = {
      deletedPosts: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    // 컴포넌트가 마운트된 후, fetchDeletePosts 메서드를 호출
    this.fetchDeletePosts();
  }

  fetchDeletePosts = () => {
    fetch('/api/delete')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deletedPosts: data });
      })
      .catch((error) => console.error('Error fetching deleted posts:', error));
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { classes } = this.props;
    const { deletedPosts, currentPage } = this.state;

    const totalPage = Math.ceil((deletedPosts ? deletedPosts.length : 0) / 10);
    const lastPostPage = currentPage * 10;
    const firstPostPage = lastPostPage - 10;
    const currentPostPage = deletedPosts ? deletedPosts.slice(firstPostPage, lastPostPage) : null;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%', fontWeight: 'bold', textAlign: 'center' }}>연번</TableCell>
              <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>제목</TableCell>
              <TableCell style={{ width: '14%', fontWeight: 'bold', textAlign: 'center' }}>작성자</TableCell>
              <TableCell style={{ width: '24%', fontWeight: 'bold', textAlign: 'center' }}>게시일</TableCell>
              <TableCell style={{ width: '24%', fontWeight: 'bold', textAlign: 'center' }}>삭제일</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentPostPage.map((post) => (
              <TableRow key={post.num}>
                <TableCell style={{ textAlign: 'center' }}>{post.num}</TableCell>
                <TableCell>
                  <Link to={`/delete/${post.num}`}
                  style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>{post.title}</Link>
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>{post.author}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{Timestamp(post.w_time)}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{Timestamp(post.d_time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {deletedPosts && (
          <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
        )}
      </Paper>
    );
  }
}

export default withStyles(Delete);

// http://localhost:3000/delete