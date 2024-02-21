import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Timestamp from './Timestamp';
import withStyles from './withStyles';

const DeleteView = (props) => {
  const { num } = useParams(); // URL의 매개변수(num) 값을 가져옴
  const [postData, setPostData] = useState({}); // 업데이트되는 포스트 데이터를 저장 

  useEffect(() => {
    fetch(`/api/delete/${num}`)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [num]);

  const restorePost = () => {
    const url = `/api/delete/${num}`;
    fetch(url, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        alert('복원이 완료되었습니다.');
        window.location.href = '/delete';
      }
      else {
        console.error('DeleteView/', response.statusText);
      }
    })
    .catch(error => console.error('DeleteView/', error));
  }

  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              연번 : <TextField name="num" value={postData.num}
              InputProps={{ readOnly: true, disableUnderline: true }} /><br />

              게시일 : <TextField name="w_time" value={Timestamp(postData.w_time)}
              InputProps={{ readOnly: true, disableUnderline: true }} /><br />

              삭제일 : <TextField name="d_time" value={Timestamp(postData.d_time)}
              InputProps={{ readOnly: true, disableUnderline: true }} /><br />

              작성자 : <TextField name="author" value={postData.author}
              InputProps={{ readOnly: true, disableUnderline: true }} /><br />

              제목 : <TextField name="title" value={postData.title}
              InputProps={{ readOnly: true, disableUnderline: true }} style={{ width: '50%' }} /><br />

              내용 : <TextField name="content" value={postData.content}
              InputProps={{ readOnly: true, disableUnderline: true }}
              multiline rows={5} style={{ width: '50%', overflowY: 'scroll' }} /><br />
            </TableRow>
          </TableHead>
          
          <TableBody>
            <Button variant="contained" color="primary" onClick={restorePost}>복원</Button>
            <Link to="/delete"><Button variant="outlined" color="primary">취소</Button></Link>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(DeleteView);