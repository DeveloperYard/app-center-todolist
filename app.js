import express from 'express';
import morgan from 'morgan';
import todoRouter from './routes/todo.js';
import memberRouter from './routes/members.js';

// express를 사용하기 위한 할당!
const app = express();

// morgan -> 테스트할 때 상태코드와 응답 처리 속도를 보기 위해 사용
app.use(morgan('dev'));

// req.body를 JSON 형식으로 파싱하기 위해 필요!
app.use(express.json());
app.get('/', (req, res)=>{
  res.sendFile('/views/hihello.html');
})
// 라우터 두 가지를 놓고 각 접근 uri마다의 라우팅 분기!
app.use('/members', memberRouter);
app.use('/todos', todoRouter);

// 에러 처리를 위한 미들웨어
app.use((req, res, next)=>{
  res.sendStatus(404);
});

// 3000번 포트에서 서버를 열고, 서버가 열리면 콘솔에 로그를 띄워 알려줌
app.listen(3000, ()=>{
  console.log('server on *:3000');
});