import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import HappyMongooseTimestamps from 'happy-mongoose-timestamps';

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
    type: 'Date',
    default: Date.now
  }
}, { timestamps: true });

const options = {
  blacklist: [],
  shouldUpdateSchema: true
}

skillSchema.plugin(HappyMongooseTimestamps, options);

let Skill = mongoose.model('Skill', skillSchema);

export default Skill;