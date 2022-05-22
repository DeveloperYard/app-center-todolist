import * as todoRepository from './todo.js';

let members = [];

let membersId = 0;

export async function getAll(){
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

}

// export async function updateTodo(newTodo){
//   let member = members.find((member) => member.id === newTodo.member.id);

//   if (member){
//     // 정보가 들어가긴 하는데,, todoList가 삭제가 안됨!
//     let todo = member.todoList.find((todo) => (todo.todoId) === newTodo.todoId);
//     todo.isComplete = true;
//     todo.updatedAt = new Date();
//     return todo;
//   }
// }

// export async function deleteTodo(todoId){
//   let member = members.find((member) => member.id == todoId);
//   if (member){
//     member.todoList = member.todoList.filter((todo) => (todo.todoId != todoId));
//     return member;
//   }
//   else{
//     return;
//   }
  
// }

// export async function addTodoToMembers(id, todo){
//   let member = members.find((member) => id == member.id);
//   member.todoList = [todo, ...member.todoList];

//   return member;
// }