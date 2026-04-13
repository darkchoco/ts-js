import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:qkekquf@localhost:27017/myFirstDatabase?authSource=admin&retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const adminDB = client.db('test').admin();
  const listDatabases = await adminDB.listDatabases();
  console.log(listDatabases);
  return 'OK';
}

run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());