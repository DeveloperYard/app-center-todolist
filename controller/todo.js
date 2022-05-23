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
  const todo = await todoRepository.getByTodoId(todoId); // await을 이용하지 않으면 빈 프로미스가 반환되므로 오류가 남!
  if (todo){
    console.log(todo);
    const memberInfo = await memberRepository.getMember(todo.member.id);
    if (memberInfo){
      res.status(200).json({member: memberInfo, todo: todo});
    }
    else{
      // member를 찾을 수 없는 경우
      res.status(404).json({message: `not found member ${todo.member.id}!`});
    }
  }
  else{
    // id에 해당하는 todo가 없을 때의 에러 처리
    res.status(404).json({message: `todo id ${todoId} isn't existed!`});
  }
}

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
  // 이미 없는 경우에도 성공적 제거가 뜸!
  const todoId = req.params.id;
  let todo = await todoRepository.getByTodoId(todoId);
  // todo 가 있을 경우 수행
  if (todo){
    // await으로 제거 진행
    await todoRepository.remove(todoId);
    // todo가 가져와지지 않으면 성공적 수행!
    if (! await todoRepository.getByTodoId(todoId)){
      res.status(200).json({message: `successfully deleted!`});
    }
    // 제거했는데도 존재하면 무언가 문제가 있음
    else{
      res.status(404).json({message: `At todo delete processing.. something went wrong!`});
    }
  }
  // 이미 todo가 없을 때
  else{
    res.status(404).json({message: `not found that todo!`});
  }
}