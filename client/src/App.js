import React, { Component } from 'react';
import { UserManage } from './components/UserManage';
import { Main } from './components/main';
import './App.css';

class App extends Component{
  render(){
    return (
    <>
      <Main/>
      <UserManage/>
    </>
  )}
}

export default App;
