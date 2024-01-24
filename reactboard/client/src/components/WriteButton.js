import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class WriteButton extends React.Component {
    render(){
        return(
        <Link to="/Write">
          <Button variant="contained" color="primary">게시글 작성하기</Button>
        </Link>
        ) 
    }
}

export default WriteButton;
