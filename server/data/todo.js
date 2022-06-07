const memberRepository = require('./members.js');

let todos = [];
let todoId = 0;

async function getAll(){
  return todos;
}

async function create(id, content){
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


async function getByTodoId(todoId){
  const todo = todos.find((todo) => todoId == todo.todoId);

  if (todo){
    return todo;
  }
  else{
    return;
  }
}

async function update(todoId){
  let todo = todos.find((todo) => todo.todoId == todoId);
  if (!todo){
    return;
  }
  todo.isComplete = true;
  todo.updatedAt = new Date();
  await memberRepository.updateMember(todo.member.id);
  return todo;
}

async function remove(todoId){
  let todo = todos.find((todo) => (todo.todoId == todoId));
  if (todo){
    const deletedTodoMemberId = todo.member.id;
    todos = todos.filter((todo)=> todoId != todo.todoId);
    await memberRepository.updateMember(deletedTodoMemberId);
  }
  else return;
}

exports.getAll = getAll;
exports.create = create;
exports.getByTodoId = getByTodoId;
exports.update = update;
exports.remove = remove;