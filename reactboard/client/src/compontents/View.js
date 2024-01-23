import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
      width: 800,
      marginTop: theme.spacing(3),
      margin: 'auto',
      overflowX: "auto"
    }
});

const View = (props) => {
    const [data, setDataList] = useState([]);
  
    useEffect(() => {

      const fetchData = async () => {
        try {
          const res = await axios.get('/api/users');
          setDataList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData(); // fetchData 함수 호출
  
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행
      
  
    const { classes } = props;
    return (
        <div>
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                        연번 : <TextField name="num" value={props.num}/><br/>
                        제목 : <TextField name="title" value={props.title}/><br/>
                        작성자 : <TextField name="author" value={props.author}/><br/>
                        글내용 : <TextField name="content" value={props.content}/><br/>
                        게시일 : <TextField name="w_time" value={props.w_time}/><br/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Link to="/"><Button variant="contained" color="primary">수정</Button></Link>
                        <Link to="/"><Button variant="outlined" color="primary">취소</Button></Link>
                    </TableBody>
                </Table>
            </Paper>
    </div>
    )
}

export default withStyles(styles)(View);