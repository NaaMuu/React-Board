import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import withStyles from './withStyles';
import { Link } from 'react-router-dom';

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      content: '',
      pw: ''
    };
  }

  handleValueChange = (e) => {
    const nextState = { [e.target.name]: e.target.value };
    this.setState(nextState);
  };

handleFormSubmit = (e) => {
  e.preventDefault();
  if (this.state.author.length > 20 || this.state.author.length === 0 ||
      this.state.title.length > 20 || this.state.title.length === 0 ||
      this.state.pw.length > 20 || this.state.pw.length === 0 ||
      this.state.content.length === 0) {
    alert('이름과 비밀번호, 제목은 1자 이상 20자 이하, 내용은 1자 이상이어야 합니다.');
    return;
  }

  this.Writepost()   
    .then((response) => {
      alert('작성이 완료되었습니다.');
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Write/handleFormSubmit()/Error', error);
    });
};

  Writepost = () => {
    const url = '/api/users';
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('pw', this.state.pw);
    formData.append('author', this.state.author);
    formData.append('content', this.state.content);
    const config = {
      headers: {
        'content-type': 'application/json', // 'content-type': 'multipart/form-data'
      },
    };
    return axios.post(url, formData, config);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TextField label="이름" type="text" name="author" value={this.state.author} onChange={this.handleValueChange} style={{width:'20%'}}/><br/>
                <TextField label="비밀번호" type="text" name="pw" value={this.state.pw} onChange={this.handleValueChange} style={{width:'20%'}}/><br/>
                <TextField label="제목" type="text" name="title" value={this.state.title} onChange={this.handleValueChange} style={{width:'50%'}}/><br/>
                <TextField label="내용" name="content" value={this.state.content} onChange={this.handleValueChange} multiline rows={10} style={{width:'50%'}} /><br/>
              </TableRow>
            </TableHead>
            <TableBody>
              <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>작성</Button>
              <Link to="/">
                <Button variant="outlined" color="primary">취소</Button>
              </Link>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(Write);