import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: 800,
    marginTop: theme.spacing(3),
    margin: 'auto',
    overflowX: "auto"
  }
});

const View = (props) => {
  const { num } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    fetch(`/api/users/${num}`)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [num]);

  const w_timestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              연번 : <TextField name="num" value={postData.num} InputProps={{ readOnly: true, disableUnderline: true }} /><br />
              제목 : <TextField name="title" value={postData.title} InputProps={{ readOnly: true, disableUnderline: true }} /><br />
              작성자 : <TextField name="author" value={postData.author} InputProps={{ readOnly: true, disableUnderline: true }} /><br />
              글내용 : <TextField name="content" value={postData.content} InputProps={{ readOnly: true, disableUnderline: true }} /><br />
              게시일 : <TextField name="w_time" value={w_timestamp(postData.w_time)} InputProps={{ readOnly: true, disableUnderline: true }} /><br />
            </TableRow>
          </TableHead>
          <TableBody>
            <Link to={`/Edit/${postData.num}`}><Button variant="contained" color="primary">수정</Button></Link>
            <Link to="/"><Button variant="outlined" color="primary">취소</Button></Link>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(View);