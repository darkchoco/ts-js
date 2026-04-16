import type { Collection } from 'mongodb';

async function writePost(collection: Collection, post: any) {
  post.hits = 0;
  post.createdAt = new Date().toISOString();
  return await collection.insertOne(post);
}

export default {
  writePost
}
