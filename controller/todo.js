import * as todoRepository from '../data/todo.js';
import * as memberRepository from '../data/members.js';

export async function getAllTodo(req, res, next){
  const todo = await todoRepository.getAll();
  if(todo){
    res.status(200).json(todo);
  }
  else{
    res.status(404).json({message: `something went wrong!`});
  }
}

export async function createTodo(req, res, next){
  const memberId = req.params.id;
  console.log(memberId);
  const content = req.body;
  console.log(content);
  const memberData = await memberRepository.getMember(memberId);
  if (memberData){
    let resultInfo = await todoRepository.create(memberId, content);
    res.status(200).json(resultInfo);
  }
  else{
    res.status(404).json({message: `${memberId} is not found!`});
  }
}

export async function getTodo(req, res, next){
  // todo + 회원정보 리턴
  const todoId = req.params.id;

  const todo = todoRepository.getByTodoId(todoId);
  if (todo){
    const memberInfo = await memberRepository.getMember(todo.member.todoId);
    res.status(200).json({member: memberInfo, todo: todo});
  }
  else{
    res.status(404).json({message: `something went wrong!`});
  } 
}

// export async function updateTodo(req, res){
//   // patch 방식으로 todo update;
//   const todoId = req.params.id;
//   const text = req.body;

//   const data = await todoRepository.update(todoId, text);
//   if (data){
//     res.status(200).json(data);
//   }
//   else{
//     res.status(404).json({message: `something went wrong!!`});
//   }
// }
// 완료 여부만 변경!

export async function updateTodo(req, res){
  const todoId = req.params.id;

  let newTodo = await todoRepository.update(todoId);

  if (newTodo){
    res.status(200).json(newTodo);
  }
  else{
    res.status(404).json({message: `isn't existed todo!`});
  }
}

export async function deleteTodo(req, res){
  const todoId = req.params.id;
  await todoRepository.remove(todoId)
  
  if (! await todoRepository.getByTodoId(todoId)){
    res.status(200).json({message: `successfully deleted!`});
  }
  else{
    res.status(404).json({message: `delete failed!`});
  }
  
}