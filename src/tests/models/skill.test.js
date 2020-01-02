import assert from 'assert';
import Skill from '../../models/skill';
const dbHandler = require('../dbHandler');

const completeSkill = {
  name: 'Skill1',
  level: 'SENIOR'
};
const oneHour = 60 * 60 * 1000;


describe('Skill Create operations', () => {
  before(async () => {
    await dbHandler.connect();
  });

  it('Creates a skill successfully', (done) => {
    const skill = new Skill(completeSkill);
    skill.save()
      .then(() => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt', (done) => {
    const skill = new Skill(completeSkill);
    skill.save()
      .then(() => {
        assert(skill.createdAt);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt with a recent (current) Datetime', (done) => {
    const skill = new Skill(completeSkill);
    skill.save()
      .then(() => {
        assert(((Date.now()) - new Date(skill.createdAt)) < oneHour);
        done();
      });
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

});

describe('Skill Delete operations', () => {
  before(async () => {
    await dbHandler.connect();
  });

  it('Deletes a Skill using its instance', (done) => {
    const skill = new Skill(completeSkill);
    skill.save()
      .then(() => {
        skill.remove()
          .then(() => Skill.findOne({ name: 'Skill1' }))
          .then((skillFounded) => {
            assert(skillFounded === null);
            done();
          });
      })
  });

  after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

});