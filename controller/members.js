const express = require('express');

const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');


async function getMembers(req, res){
  const memberList = await Member.findAll();
  if(memberList.length > 0){
    res.status(200).json(memberList);
  }
  else{
    res.status(404).json({message: 'nobody members'});
  }
}

async function createMember(req, res){
  const {email, age, name} = req.body;
  console.log(email, age, name);
  let dupMember = await Member.findOne({where: {email: email}})
  
  if (Object.keys(dupMember).length > 0){
    res.status(201).json({message: 'duplicated email!'});  
  }
  else{
    let newMember = await Member.create({
      email: email,
      age: age,
      name: name,
    })
    res.status(200).json({message: 'success!', member: newMember});
  }
}


async function getMemberById(req, res){
  const memberId = req.params.id;

  let findMember = await Member.findOne({where: {id:  memberId}});

  if (!findMember){
    res.status(404).json({message: `not found ${memberId} user`});
  }
  // todo 포함해서 넘겨줘야 함!!
  let todos = await Todo.findAll({where: {foreingKey: id}}); // Todo 가져오는 것 다시 구현해야함!

  if (!todos){
    res.status(404).json({message: `this user weren't wrting todo`});
  }

  res.status(200).json({member: findMember, todo: todos});
}


async function updateMember(req, res){
  const memberId = req.params.id;
  // just changing age and username
  const {age, username} = req.body; 
  const newInfo = await Member.findAll({where: {id: id}});

  if (newInfo){
    Member.update({age: age, name: username}, {where: {id: id}});
    res.status(200).json({message: 'success!!'});
  }
  else{
    res.status(404).json({message: `not found ${memberId}!`});
  }
}

exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMemberById = getMemberById;
exports.updateMember = updateMember;
