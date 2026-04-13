import mongoose from 'mongoose';

const { Schema } = mongoose;

// 스키마 객체 생성
const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

// 모델 객체 생성. mongoose 모델은 MongoDB와의 인터페이스 역할을 한다.
export default mongoose.model('Person', personSchema);
