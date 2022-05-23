import * as todoRepository from './todo.js';

let members = [];

let membersId = 0;

export async function getAll(){
  // members.forEach((member) => updateMember(member.id));
  return members;
}

export async function updateMember(memberId){
  let member = members.find((member) => member.id === memberId);
  
  if (member){
    member.todoList = todoRepository.todos.filter((todo) => (todo.member.id === member.id));
    return member;
  }
  else{
    return;
  }
}

export async function getMember(id){
  const member = members.find((member)=>(id == member.id));
  if (member){
    return updateMember(member.id);
  }
  else return;
}

export async function create(email, age, username){
  let newMember = {
    id: membersId++,
    email: email,
    age: age,
    username: username,
    createdAt: new Date(),
    updatedAt: new Date(),
    todoList: [],
  }

  members = [newMember, ...members];
  return newMember;
}

export async function update(id, age, username){

  let member = members.find((member) => id == member.id);
  
  if (member){
    member.age = age;
    member.username = username;
    member.updatedAt = new Date();
    return member;
  }
  // 상태코드만이므로 리턴은 따로 안함!
}

export async function remove(id){
  members =  members.filter((member) => id == member.id);
  // db 설계할 때 cascading하게 설계하자!
  // 외래 키인 member.id가 사라지면 해당 것과 연결된 todolist 삭제!
}