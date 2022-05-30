const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');


async function getMembers(req, res){
  // await이 비결!!
  const members = await Member.findAll();
  if (members) {
    res.status(200).json(members);
  }
  else {
    res.status(404).json({message: 'no member in repository!!'});
  }
}

// async function createMember(req, res){
//   const {email, age, name} = req.body;
//   const duplicateEmailMember = await memberRepository.findSameEmail(email);
//   if (duplicateEmailMember) {
//     // 중복된 이메일이 존재할 경우 이 에러 처리에 의해 걸리게 됨
//     res.status(400).json({message: `aleady existed email!! plz use different email`});
//   }
//   else  {
//       const member = await memberRepository.create(email, age, name);
//       if (member){
//         res.status(200).json(member);
//       }
//       else{
//         res.status(404).json({message: `something went wrong!`});
//       }
//   }
// }

async function createMember(req, res){
  const {email, age, name} = req.body;
  let dupUser = await Member.findAll({where: {email: email}});

  if (dupUser.length > 0){
    res.status(404).json({message: 'already exist email!!'});
  }
  
  await Member.create({
    email: email,
    age: age,
    name: name,
  })
  res.status(200).json({message: 'success!'});
}

// async function getMemberById(req, res){
//   const memberId = req.params.id;

//   const memberData = await memberRepository.getMember(memberId);
//   // const todoData = await todoRepository.getById(memberId);

//   if (memberData){
//     res.status(200).json(memberData);
//   }
//   else{
//     res.status(404).json({message: `not found todo id ${memberId} or member id ${memberId}!`});
//   }
// }
async function getMemberById(req, res){
  const memberId = req.params.id;


  let findMember = await Member.findAll({where: {id: id}});

  if (!findMember){
    res.status(404).json({message: `not found ${memberId} user`});
  }
  // todo 포함해서 넘겨줘야 함!!
  let todos = await Todo.findAll({where: {foreingKey: id}}); // ?

  if (!todos){
    res.status(404).json({message: `this user weren't wrting todo`});
  }

  res.status(200).json({member: findMember, todo: todos});
}

// async function updateMember(req, res){
//   const memberId = req.params.id;
//   // just changing age and username
//   const {age, username} = req.body; 
//   // 만약 해당 멤버가 없다면 404 not found 전송!
//   const newInfo = await memberRepository.update(memberId, age, username);
//   if (newInfo){
//     res.status(200).json(newInfo);
//   }
//   else{
//     res.status(404).json({message: `not found ${memberId}!`});
//   }
// }

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
