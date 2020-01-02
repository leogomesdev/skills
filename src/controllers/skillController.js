import Skill from '../models/skill';

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
  await Skill.findById(req.params.id).exec((err, skill) => {
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
    return res.status(201).send({ skill });
  });
}

SkillController.updateSkill = async (req, res) => {
  if (!req.body.skill) {
    return res.status(400).send({ error: "No data sent" });
  }

  try {
    const newValues = { $set: req.body.skill };
    const skill = await Skill.findByIdAndUpdate(req.params.id, newValues,
      { runValidators: true, context: 'query', new: true });

    if (!skill) {
      return res.status(404).send();
    }

    return res.send({ skill });
  } catch (err) {
    return res.status(500).send(err);
  }


}

SkillController.deleteSkill = async (req, res) => {
  await Skill.findById(req.params.id).exec((err, skill) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!skill) {
      return res.status(404).send();
    }
    skill.remove(() => {
      return res.status(204).send();
    });
  });
}

export default SkillController;