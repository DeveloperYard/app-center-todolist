import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export const TodoManage = async ()=>{
  const [todo, setTodo] = useState();

  
  const data = await axios.get({
    url: 'localhost:3000/todos'
  })
  .then((res)=>{
    setTodo(...res, todo);
  })
  .catch((err) => console.log(err));
  
  return(
    <div>
      <ul>
        <li>{JSON.stringify(data)}</li>
      </ul>
    </div>
  )
}