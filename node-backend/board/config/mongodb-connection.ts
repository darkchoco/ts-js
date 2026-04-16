import { MongoClient } from 'mongodb';

const uri = 'mongodb://bach:bach@localhost:27017/board';

export async function connectMongo() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}
