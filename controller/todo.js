const Member = require('../models/Members.js');
const Todo = require('../models/Todo.js');

async function getAllTodo(req, res, next){
  const todolist = await Todo.findAll();
  if(todo){
    res.status(200).json(todo);
  }
  else{
    res.status(404).json({message: `don't have any todo`});
  }
}

async function createTodo(req, res, next){
  const memberId = req.params.id;
  const content = req.body;

  const memberData = await Member.findAll({where: {id: memberId}});
  if (memberData){
    await Todo.create({
      content: content,
      isComplete: false,
      member: memberData
    })
    res.status(200).json(resultInfo);
  }
  else{
    res.status(404).json({message: `${memberId} is not found!`});
  }
}

// async function getTodo(req, res, next){
//   // todo + 회원정보 리턴
//   const todoId = req.params.id;
//   const todo = await todoRepository.getByTodoId(todoId); // await을 이용하지 않으면 빈 프로미스가 반환되므로 오류가 남!
//   if (todo){
//     console.log(todo);
//     const memberInfo = await memberRepository.getMember(todo.member.id);
//     if (memberInfo){
//       res.status(200).json({member: memberInfo, todo: todo});
//     }
//     else{
//       // member를 찾을 수 없는 경우
//       res.status(404).json({message: `not found member ${todo.member.id}!`});
//     }
//   }
//   else{
//     // id에 해당하는 todo가 없을 때의 에러 처리
//     res.status(404).json({message: `todo id ${todoId} isn't existed!`});
//   }
// }

async function getTodo(req, res, next){
  // todo + 회원정보 리턴
  const todoId = req.params.id;
  const todo = await Todo.findAll({where: {id: todoId}});

  if (todo){
    const mem = await Member.findAll({where: {id: todo.member.id}});
    res.status(200).json({member: mem, todo: todo});
  }
  else{
    res.status(404).json({message: 'todo isnt existed!'});
  }
}

// 완료 여부만 변경!

async function updateTodo(req, res){
  const todoId = req.params.id;

  let newTodo = await Todo.findAll({where: {id: todoId}});
  if (newTodo){
    await Todo.update({isComplete: true}, {where: {id: todoId}});
    res.status(200).json({message: 'update success!!'});
  }
  else{
    res.status(404).json({message: 'not found message!!'});
  }
}

// async function deleteTodo(req, res){
//   // 이미 없는 경우에도 성공적 제거가 뜸!
//   const todoId = req.params.id;
//   let todo = await todoRepository.getByTodoId(todoId);
//   // todo 가 있을 경우 수행
//   if (todo){
//     // await으로 제거 진행
//     await todoRepository.remove(todoId);
//     // todo가 가져와지지 않으면 성공적 수행!
//     if (! await todoRepository.getByTodoId(todoId)){
//       res.status(200).json({message: `successfully deleted!`});
//     }
//     // 제거했는데도 존재하면 무언가 문제가 있음
//     else{
//       res.status(404).json({message: `At todo delete processing.. something went wrong!`});
//     }
//   }
//   // 이미 todo가 없을 때
//   else{
//     res.status(404).json({message: `not found that todo!`});
//   }
// }

async function deleteTodo(req, res){
  let todoId = req.params.id;

  let todo = await Todo.findAll({where: {id: todoId}});
  if(todo){
    await Todo.destroy({where: {id: todoId}});
    res.status(200).json({message: 'delete success!!'});
  }
  else{
    res.status(404).json({message: 'not found todo!!'});
  }
}

exports.getAllTodo = getAllTodo;
exports.createTodo = createTodo;
exports.getTodo = getTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;