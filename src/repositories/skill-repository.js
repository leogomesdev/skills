import Skill from '../models/skill';

module.exports.listSkills = async () => {
  const skill = await Skill.find({});
  return skill;
};

module.exports.getSkill = async (id) => {
  return await Skill.findById(id);
};

module.exports.deleteSkill = async (id) => {
  const skillDeleted = await Skill.findByIdAndDelete(id);
  return skillDeleted;
};

module.exports.createSkill = async data => {
  const skill = new Skill(data);
  return await skill.save();
};

module.exports.updateSkill = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(id, { $set: data },
    { runValidators: true, context: 'query', new: true });

  return skill;
}