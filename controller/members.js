const { findAll } = require('../models/Members.js');
const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');


async function getMembers(req, res){
  const memberList = await Member.findAll();
  if (memberList){
    res.status(200).json(memberList);
  }
  else{
    res.status(404).json({message: 'nobody members'});
  }
}


async function createMember(req, res){
  try{
    const {email, age, name} = req.body;
    console.log(email, age, name);
    const dupUser = await Member.findOne({where: {email : email}});
    
    if (!dupUser){
      await Member.create({
        email: email,
        age: age,
        name: name,
        });
        res.status(200).json({message: 'success create user!'});
      }
      else{
        res.status(201).json({message: 'already existed email!'});
      }
    }
    
    
  catch(err){
    console.log('createMember err! : ', +err);
  }
}


async function getMemberById(req, res){
  const memberId = req.params.id;

  let findMember = await Member.findOne({where: {id:  memberId}});

  if (!findMember){
    res.status(404).json({message: `not found ${memberId} user`});
  }
  // todo 포함해서 넘겨줘야 함!!
  let todos = await Todo.findAll({where: {member: findMember.id}}); // Todo 가져오는 것 다시 구현해야함!
  // todo가 없다면? -> 근데 이렇게 처리하면 안될 것 같은게 promise가 비어있다면?
  if (!todos){
    res.status(404).json({message: `this user weren't wrting todo`});
  }

  res.status(200).json({member: findMember, todo: todos});
}


async function updateMember(req, res){
  const memberId = req.params.id;
  // just changing age and username
  const {age, username} = req.body; 
  const newInfo = await Member.findAll({where: {id: memberId}});

  if (newInfo){
    Member.update({age: age, name: username}, {where: {id: memberId}});
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
