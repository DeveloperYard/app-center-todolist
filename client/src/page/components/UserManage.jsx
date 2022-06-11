import React from 'react';
import axios from 'axios';
import { useState } from 'react';



export const UserManage = async ()=>{
  let form = new FormData();
  form.append('email', this.email);
  form.append('age', this.age);
  form.append('name', this.name);

  await axios.post('localhost:3000/members', form)
    .then(response => {
      console.log(`response : ${response}`);
    })
    .catch(err => console.log(err));

  // const data = await axios.get({
  //   url: 'localhost:3000/members'
  // })
  // .then((res)=>{
  //   console.log(res.data);
  // })
  // .catch((err) => console.log(err));
  
  return(
    <>
    <form className="write" action="/members" method="POST">
      <input className="todo_input" type="text" name="email" required />
      <input className="todo_input" type="text" name="age" required />
      <input className="todo_input" type="text" name="name" required />
      <button type="submit" className="submit_btn">ENTER</button>
    </form>
    </>
  )
}