import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import todoRouter from './routes/todo.js';
import memberRouter from './routes/members.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/members', memberRouter);
app.use('/todos', todoRouter);

app.use((req, res, next)=>{
  res.sendStatus(404);
})
app.listen(3000, ()=>{
  console.log('server on *:3000');
})