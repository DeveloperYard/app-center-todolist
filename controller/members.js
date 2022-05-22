import * as memberRepository from '../data/members.js';
import * as todoRepository from '../data/todo.js';

export async function getMembers(req, res){
  // await이 비결!!
  const members = await memberRepository.getAll();
  if (members) {
    res.status(200).json(members);
  }
  else {
    res.status(404).json({message: 'something went wrong!!'});
  }
}

export async function createMember(req, res){
  const {email, age, name} = req.body;
  const member = await memberRepository.create(email, age, name);
  if (member){
    res.status(200).json(member);
  }
  else{
    res.status(404).json({message: `something went wrong!`});
  }
}

export async function getMemberById(req, res){
  const memberId = req.params.id;

  const memberData = await memberRepository.getMember(memberId);
  // const todoData = await todoRepository.getById(memberId);

  if (memberData){
    res.status(200).json(memberData);
  }
  else{
    res.status(404).json({message: `not found todo of ${memberId} or ${memberId}!`});
  }
}

export async function updateMember(req, res){
  const curId = req.params.id;
  console.log(curId);
  const newId = req.body.newId;
  console.log(newId);
  // 만약 해당 멤버가 없다면 404 not found 전송!
  const newInfo = await memberRepository.update(curId, newId);
  if (newInfo){
    res.status(200).json(newInfo);
  }
  else{
    res.status(404).json({message: `not found ${curId}!`});
  }
  
}
