let members = [];

let membersId = 0;

export async function getAll(){
  return members;
}

export async function getMember(id){
  const member = members.find((member)=>(id == member.id));
  if (member){
    return member
  }
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

export async function update(curId, newId){
  let member = members.find((member) => curId == member.id);
  
  if (member){
    member.id = newId;
    member.updatedAt = new Date();
    return member;
  }
  // 상태코드만이므로 리턴은 따로 안함!
}

export async function remove(id){
  await members.filter((member) => id == member.id);
}

export async function addTodoToMembers(id, todo){
  let member = members.find((member) => id == member.id);
  member.todoList = [todo, ...member.todoList];

  return member;
}