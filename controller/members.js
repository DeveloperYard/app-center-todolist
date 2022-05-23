import * as memberRepository from '../data/members.js';
import * as todoRepository from '../data/todo.js';

export async function getMembers(req, res){
  // await이 비결!!
  const members = await memberRepository.getAll();
  if (members) {
    res.status(200).json(members);
  }
  else {
    res.status(404).json({message: 'no member in repository!!'});
  }
}

export async function createMember(req, res){
  const {email, age, name} = req.body;
  const duplicateEmailMember = await memberRepository.findSameEmail(email);
  if (duplicateEmailMember) {
    // 중복된 이메일이 존재할 경우 이 에러 처리에 의해 걸리게 됨
    res.status(400).json({message: `aleady existed email!! plz use different email`});
  }
  else  {
      const member = await memberRepository.create(email, age, name);
      if (member){
        res.status(200).json(member);
      }
      else{
        res.status(404).json({message: `something went wrong!`});
      }
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
    res.status(404).json({message: `not found todo id ${memberId} or member id ${memberId}!`});
  }
}

export async function updateMember(req, res){
  const memberId = req.params.id;
  // just changing age and username
  const {age, username} = req.body; 
  // 만약 해당 멤버가 없다면 404 not found 전송!
  const newInfo = await memberRepository.update(memberId, age, username);
  if (newInfo){
    res.status(200).json(newInfo);
  }
  else{
    res.status(404).json({message: `not found ${memberId}!`});
  }
  
}
