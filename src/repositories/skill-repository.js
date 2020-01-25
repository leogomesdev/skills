import Skill from '../models/skill';

export async function listSkills() {
  return Skill.find({});
}

export async function getSkill(id) {
  return Skill.findById(id);
}

export async function deleteSkill(id) {
  return Skill.findByIdAndDelete(id);
}

export async function createSkill(data) {
  const skill = new Skill(data);
  return skill.save();
}

export async function updateSkill(id, data) {
  return Skill.findByIdAndUpdate(
    id,
    { $set: data },
    { runValidators: true, context: 'query', new: true }
  );
}
