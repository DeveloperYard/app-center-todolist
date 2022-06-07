import './App.css';
import TodoListTemplate from './components/TodoListTemplate';
import UserListTemplate from './components/UserListTemplate';

function App() {
  // const name = 'react';
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: 24, // 기본 단위 px
  //   padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  // }
  return (
    <>
      <UserListTemplate/>
      <TodoListTemplate/>
    </>
  );
}

export default App;
