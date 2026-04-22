import express from 'express';
import handlebars from 'express-handlebars';
import { connectMongo } from './config/mongodb-connection.js';
// TypeScript 파일이라도, ESM 환경에서는 런타임 기준으로 경로를 맞춰야 해서 
// ./config/handlebars-helpers.js처럼 쓴다.
// tsx가 실행할 때 .ts를 잘 처리해 주지만, ESM import 문법에서는 이 방식이 가장 안전.
import helpers from './config/handlebars-helpers.js';
import postService from './services/post-service.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 올바른 handlebars 설정
app.engine('handlebars', handlebars.create({
    helpers,
}).engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/', async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1; // 현재 페이지 데이터
    const search = typeof req.query.search === 'string' ? req.query.search : ''; // 검색어 데이터
    try {
        // postService.list에서 글리스트와 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);
        // 리스트 페이지 렌더링.
        // 객체에 값을 할당할 때 값으로 사용하는 변수명과 키 이름이 같다면 변수만 바로 넣어도 된다.
        res.render('home', { title: '테스트 게시판', search, paginator, posts });
    }
    catch (error) {
        console.error(error);
        res.render('home', { title: '테스트 게시판' }); // 에러가 나는 경우는 빈값으로 렌더링
    }
});
app.get('/write', (_req, res) => {
    res.render('write', { title: '테스트 게시판', mode: 'create' });
});
app.get('/modify/:id', async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render('write', { title: '테스트 게시판', mode: 'modify', post });
});
app.post('/modify/', async (req, res) => {
    const { id, password, title, writer, content } = req.body;
    const post = {
        password,
        title,
        writer,
        content,
        createdAt: new Date().toISOString(),
    };
    const result = await postService.updatePost(collection, id, post);
    if (!result) {
        return res.status(404).json({ success: false, message: 'Post not found or password incorrect' });
    }
    res.redirect(`/detail/${id}`);
});
app.delete('/delete', async (req, res) => {
    const { id, password } = req.body;
    const result = await postService.deletePost(collection, id, password);
    if (!result) {
        return res.status(404).json({ success: false, message: 'Post not found or password incorrect' });
    }
    res.status(200).json({ success: true });
});
app.post('/write-comment', async (req, res) => {
    const { id, name, password, comment } = req.body;
    const post = await postService.getPostById(collection, id);
    if (!post)
        return res.status(404).json({ success: false, message: 'Post not found' });
    const newComment = {
        idx: post.comments ? post.comments.length + 1 : 1,
        name,
        password,
        comment,
        createdAt: new Date().toISOString(),
    };
    if (post.comments)
        post.comments.push(newComment);
    else
        post.comments = [newComment];
    const result = await postService.updatePost(collection, id, post);
    if (!result) {
        return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true });
});
app.delete('/delete-comment', async (req, res) => {
    const { id, commentIdx, password } = req.body;
    const result = await postService.deleteComment(collection, id, commentIdx, password);
    if (!result) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true });
});
app.get('/detail/:id', async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    if (!result) {
        return res.status(404).send('Post not found');
    }
    res.render('detail', { title: '테스트 게시판', post: result });
});
app.post('/check-password', async (req, res) => {
    const { id, password } = req.body;
    const post = await postService.getPostByIdAndPassword(collection, { id, password });
    if (!post) {
        return res.status(404).json({ isExist: false });
    }
    else {
        return res.json({ isExist: true });
    }
});
app.post('/write', async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});
let collection;
app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
    const client = await connectMongo();
    collection = client.db().collection('posts');
    console.log('MongoDB connection established');
});
//# sourceMappingURL=app.js.map