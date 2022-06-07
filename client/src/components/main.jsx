import React, { useState } from 'react';
import axios from 'axios';

export const Main = () => {
  const [email, age, name, setTodo] = useState("");

  const onChange = (e) => {
    setTodo(e.target.value);
  }

  const onSubmit = async (e) => {
        e.preventDefault() // 브라우저의 도움없이 직접 이벤트를 처리하겠다
    await axios.post('/members', { //REST API에 작성했던 '/create' url 작성
      email: email,
      age: age,
      name: name
    }).then((res) => { // 전송성공하면
      alert('전송성공'); // 알럿을 띄운다.
      console.log(res);
      window.location.reload(); // 화면을 새로고침 한다.
    }).catch((err) => { // 에러발생 시,
      console.log(err); // 에러 콘솔을 띄움
    })
  }

  return (
    <form className="write" onSubmit={onSubmit}>
      <input className="todo_input" type="text" name="email" onChange={onChange} required />
      <input className="todo_input" type="text" name="age" onChange={onChange} required />
      <input className="todo_input" type="text" name="name" onChange={onChange} required />
      <button type="submit" className="submit_btn">ENTER</button>
    </form>
  )
}