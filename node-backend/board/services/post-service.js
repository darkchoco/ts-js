import { ObjectId } from 'mongodb';
import paginator from '../utils/paginator.js';
async function writePost(collection, post) {
    post.hits = 0;
    post.createdAt = new Date().toISOString();
    return await collection.insertOne(post);
}
async function list(collection, page, search) {
    const perPage = 10;
    const query = { title: new RegExp(search, 'i') };
    const cursor = collection.find(query, { limit: perPage, skip: (page - 1) * perPage }).sort({ createdAt: -1 });
    const totalCount = await collection.countDocuments(query);
    const posts = await cursor.toArray();
    const paginatorObj = paginator({ totalCount, page, perPage: perPage });
    return [posts, paginatorObj];
}
// DB에서 프로젝션은 필요한 필드만 선택해서 가져오는 것을 의미
// 댓글 비밀번호 제외
const projectionOption = {
    projection: {
        password: 0,
        'comments.password': 0
    }
};
async function getDetailPost(collection, id) {
    return collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $inc: { hits: 1 } }, projectionOption);
}
async function getPostByIdAndPassword(collection, { id, password }) {
    return await collection.findOne({ _id: new ObjectId(id), password }, projectionOption);
}
async function getPostById(collection, id) {
    return await collection.findOne({ _id: new ObjectId(id) }, projectionOption);
}
async function updatePost(collection, id, post) {
    const toUpdatePost = {
        $set: {
            ...post,
        }
    };
    return await collection.updateOne({ _id: new ObjectId(id) }, toUpdatePost);
}
async function deletePost(collection, id, password) {
    return await collection.deleteOne({ _id: new ObjectId(id), password });
}
async function deleteComment(collection, id, commentIdx, password) {
    return await collection.findOne({
        _id: new ObjectId(id),
        comments: { $elemMatch: { idx: commentIdx, password } }
    }, projectionOption);
}
export default {
    writePost,
    list,
    getDetailPost,
    getPostByIdAndPassword,
    getPostById,
    updatePost,
    deletePost,
    deleteComment
};
//# sourceMappingURL=post-service.js.map