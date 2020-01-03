import Skill from '../models/skill';

export async function listSkills() {
  const skill = await Skill.find({});
  return skill;
}

export async function getSkill(id) {
  return await Skill.findById(id);
}

export async function deleteSkill(id) {
  const skillDeleted = await Skill.findByIdAndDelete(id);
  return skillDeleted;
}

export async function createSkill(data) {
  const skill = new Skill(data);
  return await skill.save();
}

export async function updateSkill(id, data) {
  const skill = await Skill.findByIdAndUpdate(id, { $set: data },
    { runValidators: true, context: 'query', new: true });

  return skill;
}