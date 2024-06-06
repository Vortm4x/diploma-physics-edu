import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScenarioSchema = new Schema({
  owner: { type: String },
  name: { type: String },
  data: { type: String },
});


export { ScenarioSchema };