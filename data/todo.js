import * as memberRepository from './members.js';

let todos = [];
let todoIndex = 0;

export async function getAll(){
  return todos;
}

export async function create(id, content){
  let member = memberRepository.getMember(id);

  let deepCopyMember = {...member};

  const data = {
    id: todoIndex++,
    content: content,
    isComplete: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    // 여기서 왜 깊은 복사가 안될까?
    member: deepCopyMember,
  };
  console.log(deepCopyMember);
  //console.log(memberRepository.members);

  todos = [data,...todos];

  return await memberRepository.addTodoToMembers(id, data);
  // 재귀적으로 멤버가 생성되는 것은 어떻게 해야 할까?
}


export async function getByTodoId(todoId){
  const todo = await todos.find((todo) => todoId === todo.id);

  if (todo){
    return todo;
  }
}

export async function update(todoId, content){
  let todo = todos.find((todo) => todoId === todo.id);
  
  let copyTodo = {...todo};
  copyTodo.content = content;

  await todos.filter((todo)=>todoId === todo.id);
  todos = [copyTodo, ...todos];

  todos.sort(id);

  return copyTodo;
}

export async function remove(todoId){
  await todos.filter((todo)=> todoId === todo.id);
}

