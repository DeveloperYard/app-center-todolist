import React from 'react';
import axios from 'axios';

const TodoListTemplate = () => {
  const getAll = async () =>{
    const response = await axios.get(
      {
        url: 'http://localhost:3000/todos',
    });
    console.log(response);
  }
  return (
    <div>
      {getAll()}
    </div> 
  );
};

export default TodoListTemplate;