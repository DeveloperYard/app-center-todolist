import * as memberRepository from './members.js';

let todos = [];
let todoId = 0;

export async function getAll(){
  return todos;
}

export async function create(id, content){
  let member = await memberRepository.getMember(id);

  let copyMember = {id : member.id, email: member.email, age: member.age, username: member.username};

  let newTodo = {
    todoId: todoId++,
    content: content,
    isComplete: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    // 여기서 왜 깊은 복사가 안될까?
    member: copyMember,
  };
  console.log(copyMember);
  //console.log(memberRepository.members);

  todos = [newTodo, ...todos];

  return await memberRepository.addTodoToMembers(id, newTodo);
  // 재귀적으로 멤버가 생성되는 것은 어떻게 해야 할까?
}


export async function getByTodoId(todoId){
  const todo = await todos.find((todo) => todoId == todo.todoId);

  if (todo){
    return todo;
  }
}

export async function update(todoId, content){
  let todo = todos.find((todo) => todoId == todo.todoId);

  let copyTodo = {...todo};
  copyTodo.content = content;

  copyTodo.updatedAt = new Date();
  todos.filter((todo) => todoId == todo.todoId);
  todos = [copyTodo, ...todos];

  return copyTodo;
}

export async function remove(todoId){
  await todos.filter((todo)=> todoId == todo.id);
}

