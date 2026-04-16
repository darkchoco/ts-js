import express from 'express';
import handlebars from 'express-handlebars';
import { connectMongo } from './config/mongodb-connection.js';
// TypeScript 파일이라도, ESM 환경에서는 런타임 기준으로 경로를 맞춰야 해서 
// ./config/handlebars-helpers.js처럼 쓴다.
// tsx가 실행할 때 .ts를 잘 처리해 주지만, ESM import 문법에서는 이 방식이 가장 안전.
import helpers from './config/handlebars-helpers.js';
import postService from './services/post-service.js';
import type { Collection, Document } from 'mongodb';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 올바른 handlebars 설정
app.engine('handlebars', handlebars.create({
  helpers,
}).engine);

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {title: '테스트 게시판'});
});

app.get('/write', (req, res) => {
  res.render('write', {title: '테스트 게시판'});
});

app.get('/detail/:id', async (req, res) => {
  res.render('detail', { title: '테스트 게시판' });
})

app.post('/write', async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${ result.insertedId }`);
});

let collection: Collection<Document>;
app.listen(3000, async () => {
  console.log('Server is running on http://localhost:3000');
  const client = await connectMongo();
  collection = client.db().collection('posts');
  console.log('MongoDB connection established');
});
