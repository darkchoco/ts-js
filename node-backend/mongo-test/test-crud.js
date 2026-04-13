import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://admin:qkekquf@localhost:27017/myFirstDatabase?authSource=admin&retryWrites=true&w=majority');

async function main() {
  try {
    await client.connect();

    /** @typedef {{ name: string, age: number }} Person */

    /** @type {import('mongodb').Collection<Person>} */
    const collection = client.db('test').collection('person');

    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log('document 추가 완료');

    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('찾은 document:', documents);

    await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
    console.log('document 업데이트');

    const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
    console.log('갱신된 document :', updatedDocuments);

    await collection.deleteOne({ name: 'Andy' });
    console.log('document 삭제');

    // 연결 끊기 
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

await main();
