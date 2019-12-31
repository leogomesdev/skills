import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['JUNIOR', 'SENIOR', 'EXPERT'],
    required: true,
    uppercase: true
  },
  createdAt: {
    type: 'Date',
    default: Date.now
  },
  updatedAt: {
    type: 'Date'
  }
});

let Skill = mongoose.model('Skill', skillSchema);

export default Skill;