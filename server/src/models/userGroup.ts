import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserGroupSchema = new Schema({
  //  author: ObjectId,
  email: { type: String, unique: true },
  groups: { type: [ObjectId] },
});


export { UserGroupSchema };