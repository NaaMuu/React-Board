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

const styles = theme => ({       // theme 객체를 활용하여 동적인 스타일 정의
  root: {
    width: 800,                  // 너비: 800px
    marginTop: theme.spacing(3), // 상단 여백: (테마에서 정의한 여백 크기 * 3)px
    margin: 'auto',              // 가운데 정렬
    overflowX: 'auto'            // 가로 스크롤이 발생할 경우, 스크롤 바를 표시
  },
  progress: {
    margin: theme.spacing(2)     // 주위 여백: (테마에서 정의한 여백 크기 * 2)px
  },
  button: {
    marginTop: theme.spacing(2)  // 상단 여백: (테마에서 정의한 여백 크기 * 2)px
  }
});

/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

/* React 컴포넌트를 정의하는 방법
1. 함수로 정의
+ const App = (props) => {}
- 함수형 컴포넌트를 정의, 화살표 함수를 사용하여 간단하게 컴포넌트를 작성
- 함수형 컴포넌트는 상태(state)나 라이프사이클 메서드를 사용하지 않고, 주로 간단한 UI 렌더링에 사용

2. 클래스로 정의
클래스로 정의하기 위해서는 React.Component를 상속받아야 함
또한 render()는 하위 class에서 필수로 정의해야 하는 메소드 (render메소드는 렌더링하고 싶은 JSX를 반환)
그리고 component의 state(상태)를 적용하기 위해 constructor(props)

와 super(props)를 사용

+ class App extends Component {}
- React 클래스 컴포넌트를 정의
- Component 클래스는 React 라이브러리에서 제공되는 기본 클래스로, React 컴포넌트의 기능과 라이프사이클 메서드를 상속

+ class App extends React.Component {}
- React를 명시적으로 가져와서 Component 클래스를 사용
- 일반적으로 React를 직접 가져오는 방식으로, 명시적인 React 모듈 참조를 사용하여 코드를 작성하는 것 */

/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

class App extends Component { 
  // constructor 메서드: 클래스의 생성자를 정의, 주로 초기 상태(state)를 설정
  constructor(props) {
    super(props); /*
    - super 메서드: 부모 클래스의 생성자를 호출하는 데 사용
    - JavaScript의 클래스에서 super를 호출하여 부모 클래스의 생성자를 실행 */
    this.state = {
      users: '',
      completed: 0
    };
  } /*
  - 애플리케이션의 초기 상태를 설정
  - users는 게시글 정보를 담을 배열, completed는 로딩 중에 사용할 진행률을 나타내는 값 */

  // progress 메서드
  progress = () => {
    const { completed } = this.state; // 객체 비구조화 할당을 사용하여 this.state에서 completed라는 속성을 추출
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); // 100보다 크거나 같으면 0으로 리셋, 그렇지 않으면 1 증가
  }; /*
  - 주기적으로 호출되어 this.setState를 사용하여 React 컴포넌트의 상태를 업데이트
  - 로딩 중에 CircularProgress 컴포넌트의 진행률을 나타내기 위한 것 */

  // 
  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    return body;
  }; /*
  -
  - */
  
  // 
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ users: res }))
      .catch(err => console.log(err));
  } /*
  -
  - */
  
  // 
  render() {
    const { classes } = this.props;
    return (
      <div>
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
        <Link to="/Write">
          <Button className={classes.button} variant="contained" color="primary">
            게시글 작성하기
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(App);