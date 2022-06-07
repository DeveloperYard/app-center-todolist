'use strict';

const express = require('express');

const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');


async function getAllTodo(req, res, next){
  const todo = await Todo.findAll({
    include: {
      model: Member,
      where: {},
    }
  }); 
  if(todo){
    res.status(200).json(todo);
  }
  else{
    res.status(404).json({message: `don't have any todo`});
  }
}

// 여기서 foreign key 참조 무결성 오류 발생
async function createTodo(req, res, next){
  try{
    const memberId = req.params.id;
    const content = req.body.content;
    const isCompleted = req.body.isCompleted;

    const memberData = await Member.findAll({where: {id: memberId}});

    console.log(typeof(memberData[0].id));
    // Id에 해당하는 멤버가 있을 때에만 Todo 생성을 가능케 함
    if (memberData){
      const todo = await Todo.create({
        member: memberId, // foreign key constraints fails how to solve?
        content: content,
        isCompleted: isCompleted,
      });
    res.status(200).json({message: 'create todo success!!', todo: todo});
    }
  } catch(err){
    console.log(`create todo error : ` + err);
  }
}


async function getTodo(req, res, next){
  // todo + 회원정보 리턴
  const todoId = req.params.id;
  console.log(todoId);
  const todo = await Todo.findOne({include:{model:Member, where: {id: todoId}}});
  if (todo){
    const mem = await Member.findAll({where: {id: todo[0].member}}); // index access
    res.status(200).json({member: mem, todo: todo});
  }
  else{
    res.status(404).json({message: 'todo isnt existed!'});
  }
}

// 완료 여부만 변경!
// content도 추가할 수 있음
async function updateTodo(req, res){
  const todoId = req.params.id;

  let newTodo = await Todo.findAll({where: {id: todoId}});
  console.log(newTodo);
  if (newTodo.length > 0){
    await Todo.update({content: req.body.content, isCompleted: true}, {where: {id: todoId}});
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