import express from 'express';
import * as memberController from '../controller/members.js';
import * as todoController from '../controller/todo.js';

const router = express.Router();

router.get('/', memberController.getMembers);

router.post('/', memberController.createMember);

router.get('/:id', memberController.getMemberById);

router.patch('/:id', memberController.updateMember);

router.post('/:id/todos', todoController.createTodo);

export default router;