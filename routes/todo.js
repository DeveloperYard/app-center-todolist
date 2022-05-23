import express from 'express';
import * as todoController from '../controller/todo.js';

const router = express.Router();

// 모든 todo 가져옴!
router.get('/', todoController.getAllTodo);

//todo 식별자 조회, todo + 회원정보 리턴 
router.get('/:id', todoController.getTodo);

// todo 수정,  상태코드만 리턴!
router.patch('/:id', todoController.updateTodo);

// todo 삭제, 상태코드만 리턴!
router.delete('/:id', todoController.deleteTodo);

// app.js에서 사용할 수 있도록 함!
export default router;