import Skill from '../models/skill';
import mongoose from 'mongoose';

const SkillController = {};

SkillController.getAll = async (req, res) => {
  await Skill.find().sort('-createdAt').exec((err, skills) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.json({ skills });
  });
}

SkillController.getSkill = async (req, res) => {
  const validSkillId = mongoose.Types.ObjectId.isValid(req.params.skillId);
  if (!validSkillId) {
    return res.status(400).send({ error: "Malformed ID" });
  }
  await Skill.findById(req.params.skillId).exec((err, skill) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!skill) {
      return res.status(404).send();
    }
    return res.send({ skill });
  });
}

SkillController.addSkill = async (req, res) => {
  const skill = new Skill(req.body.skill);

  await skill.save(function (err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({ skill });
  });
}

SkillController.updateSkill = async (req, res) => {
  if (!req.body.skill) {
    return res.status(400).send({ error: "No data sent" });
  }
  const validSkillId = mongoose.Types.ObjectId.isValid(req.params.skillId);
  if (!validSkillId) {
    return res.status(400).send({ error: "Malformed ID" });
  }

  const skill = await Skill.findByIdAndUpdate(req.params.skillId, req.body.skill, { new: true }, function (error) {
    if (error && error.message.indexOf('Cast to ObjectId failed') !== -1) {
      return res.status(400).send({ error: "Malformed ID" });
    }
    if (error) {
      return res.status(400).send(err);
    }
  });

  if (!skill) {
    return res.status(404).send();
  }

  return res.send({ skill });
}

SkillController.deleteSkill = async (req, res) => {
  const validSkillId = mongoose.Types.ObjectId.isValid(req.params.skillId);
  if (!validSkillId) {
    return res.status(400).send({ error: "Malformed ID" });
  }
  await Skill.findById(req.params.skillId).exec((err, skill) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!skill) {
      return res.status(404).send();
    }
    skill.remove(() => {
      return res.status(200).send();
    });
  });
}

export default SkillController;