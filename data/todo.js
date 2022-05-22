import * as memberRepository from './members.js';

export let todos = [];
let todoId = 0;

export async function getAll(){
  return todos;
}

export async function create(id, content){
  let member = await memberRepository.getMember(id);

  let copyMember = {
    id : member.id, 
    email: member.email, 
    age: member.age, 
    username: member.username
  };

  let newTodo = {
    todoId: todoId++,
    content: content,
    isComplete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    // 여기서 왜 깊은 복사가 안될까?
    member: copyMember,
  };
  console.log(copyMember);
  //console.log(memberRepository.members);

  todos = [newTodo, ...todos];
  // 새로운 todo가 생길 때마다 멤버의 todo list를 업데이트해줌!
  await memberRepository.updateMember(id);
  return newTodo;
  // 재귀적으로 멤버가 생성되는 것은 어떻게 해야 할까? -> deepcopy!
}


export async function getByTodoId(todoId){
  const todo = await todos.find((todo) => todoId == todo.todoId);

  if (todo){
    return todo;
  }
}

export async function update(todoId){
  let todo = todos.find((todo) => todo.todoId == todoId);
  if (!todo){
    return;
  }
  todo.isComplete = true;
  todo.updatedAt = new Date();
  await memberRepository.updateMember(todo.member.id);
  return todo;
}

export async function remove(todoId){
  let todo = todos.find((todo) => (todo.todoId == todoId));
  todos = todos.filter((todo)=> todoId != todo.todoId);

  await memberRepository.updateMember(todo.member.id);

  return todo;
}

