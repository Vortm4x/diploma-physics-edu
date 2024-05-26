import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SharedScenarioSchema = new Schema({
  owner: { type: String },
  name: { type: String },
  dateShared: { type: Date },
  data: { type: Map },
  marks: { type: Map },
});


export { SharedScenarioSchema };