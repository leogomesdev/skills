import * as skillRepository from '../repositories/skill-repository';

const SkillController = {};

SkillController.getAll = async (req, res) => {
  try {
    const data = await skillRepository.listSkills();
    res.status(200).send({ skills: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error on loading data' });
  }
};

SkillController.getSkill = async (req, res) => {
  try {
    const skill = await skillRepository.getSkill(req.params.id);
    if (!skill) {
      return res.status(404).send();
    }
    return res.send({ skill });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error on loading data' });
  }
};

SkillController.addSkill = async (req, res) => {
  try {
    const skill = await skillRepository.createSkill(req.body.skill);
    if (!skill) {
      return res.status(404).send();
    }
    return res.status(201).send({ skill });
  } catch (error) {
    return res.status(400).send(error);
  }
};

SkillController.updateSkill = async (req, res) => {
  if (!req.body.skill) {
    return res.status(400).send({ error: "No data sent" });
  }
  try {
    const skill = await skillRepository.updateSkill(req.params.id, req.body.skill)
    if (!skill) {
      return res.status(404).send();
    }
    return res.send({ skill });
  } catch (error) {
    return res.status(400).send(error);
  }
};

SkillController.deleteSkill = async (req, res) => {
  try {
    const skillDeleted = await skillRepository.deleteSkill(req.params.id);
    if (!skillDeleted) {
      return res.status(404).send();
    }
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error on processing data' });
  }
};

export default SkillController;