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

const View = (props) => {
  const { num } = useParams(); // URL의 매개변수(num) 값을 가져옴
  const [postData, setPostData] = useState({}); // 업데이트되는 포스트 데이터를 저장 

  useEffect(() => {
    fetch(`/api/posts/${num}`)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [num]);

  const deletePost = () => {
    const url = `/api/posts/${num}`; // 삭제할 포스트의 API 엔드포인트 URL이 저장
    const inputPW  = prompt('비밀번호를 입력하세요.');
    if (!inputPW) { return; }
    if (postData.pw === inputPW) {
      fetch(url, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            alert('삭제가 완료되었습니다.');
            window.location.href = '/';
          }
          else {
            console.error('View/deletePost/', response.statusText);
          }
        })
        .catch(error => console.error('View/deletePost/', error));
    }
    else {
      alert('비밀번호가 올바르지 않습니다.');
    }
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
            <Link to={`/Edit/${postData.num}`}><Button variant="contained" color="primary">수정</Button></Link>
            <Link to="/"><Button variant="outlined" color="primary">취소</Button></Link>
            <Button variant="contained" color="secondary" onClick={deletePost}>삭제</Button>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(View);