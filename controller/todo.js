const express = require('express');

const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');


async function getAllTodo(req, res, next){
  const todo = await Todo.findAll();
  if(todo){
    res.status(200).json(todo);
  }
  else{
    res.status(404).json({message: `don't have any todo`});
  }
}


async function createTodo(req, res, next){
  
  try{
    const memberId = req.params.id;
    const content = req.body.content;
    const memberData = await Member.findAll({where: {id: memberId}});
    if (memberData){
      const todo = await Todo.create({
        content: content,
        isComplete: req.body.isComplete,
        member: memberId
      })
    res.status(200).json({message: 'create todo success!!', todo: todo});
    }
  } catch(err){
    console.log(`create todo error : ` + err);
  }

}


async function getTodo(req, res, next){
  // todo + 회원정보 리턴
  const todoId = req.params.id;
  const todo = await Todo.findAll({where: {id: todoId}});

  if (todo){
    const mem = await Member.findAll({where: {id: todo.member}});
    res.status(200).json({member: mem, todo: todo});
  }
  else{
    res.status(404).json({message: 'todo isnt existed!'});
  }
}


// 완료 여부만 변경!
async function updateTodo(req, res){
  const todoId = req.params.id;

  let newTodo = await Todo.findAll({where: {id: todoId}});
  if (newTodo){
    await Todo.update({isComplete: true}, {where: {id: todoId}});
    res.status(200).json({message: 'update success!!'});
  }
  else{
    res.status(404).json({message: 'not found message!!'});
  }
}


async function deleteTodo(req, res){
  let todoId = req.params.id;

  let todo = await Todo.findAll({where: {id: todoId}});
  if(todo){
    await Todo.destroy({where: {id: todoId}});
    res.status(200).json({message: 'delete success!!'});
  }
  else{
    res.status(404).json({message: 'not found todo!!'});
  }
}


exports.getAllTodo = getAllTodo;
exports.createTodo = createTodo;
exports.getTodo = getTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;