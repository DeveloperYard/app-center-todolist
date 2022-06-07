import React from 'react';
import axios from 'axios';

const UserListTemplate = () => {
  const userMethod = async ()=>{
    await axios.get('http://localhost:3000/members')
      .then((result)=>{
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })

    await axios.post('http://localhost:3000/members', {
      email: "",
      age:"",
      username:"",
    })
      .then((result)=>{
        console.log(email, age, username);
      })
      .catch((err)=>{console.log(err)});
  }

  return (
    <div>
      {userMethod}
    </div> 
  );
};

export default UserListTemplate;