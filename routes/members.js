const express = require('express');
const memberController = require('../controller/members.js');
const todoController = require('../controller/todo.js');

const router = express.Router();
// 모든 멤버의 정보를 가져옴
router.get('/', memberController.getMembers);

// 회원 생성 -> return status code
router.post('/', memberController.createMember);

// id를 통해 회원 정보를 가져옴 -> 회원 + 회원의 todolist return
router.get('/:id', memberController.getMemberById);

// 회원 수정 -> return status code
router.patch('/:id', memberController.updateMember);

// 해당 멤버에게 투두리스트 추가 -> return status code
router.post('/:id/todos', todoController.createTodo);

module.exports = router;