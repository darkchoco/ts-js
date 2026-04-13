import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Person from './person-model.js';

mongoose.set("strictQuery", false);  // Mongoose 7이상에서는 설정해줘야 경고가 뜨지 않음

const app = express();
app.use(bodyParser.json());  // JSON 데이터를 파싱하기 위한 미들웨어 추가
app.listen(3000, () => {
  console.log("Server started");
  const mongodbUri =
    "mongodb://admin:qkekquf@localhost:27017/myFirstDatabase?authSource=admin&retryWrites=true&w=majority";
  mongoose
    .connect(mongodbUri)
    .then(() => console.log("Connected to MongoDB"));
});

app.get("/person", async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});

app.put("/person/:email", async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'Request body is empty' });
  }
    
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    // { new: true }
    { returnDocument: 'after' }
  );
  console.log(person);
  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
