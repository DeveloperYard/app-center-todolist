import express from 'express';
import * as memberController from '../controller/members.js';
import * as todoController from '../controller/todo.js';

const router = express.Router();

// 모든 멤버의 정보를 가져옴
router.get('/', memberController.getMembers);

// 회원 생성
router.post('/', memberController.createMember);

// id를 통해 회원 정보를 가져옴
router.get('/:id', memberController.getMemberById);

// id 수정
router.patch('/:id', memberController.updateMember);

// 해당 멤버에게 투두리스트 추가
router.post('/:id/todos', todoController.createTodo);

export default router;