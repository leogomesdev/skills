import assert from 'assert';
import * as skillRepository from '../../repositories/skill-repository';
import Skill from '../../models/skill';
const dbHandler = require('../dbHandler');

const skillOne = {
  name: 'Skill1',
  level: 'SENIOR'
};
const oneHour = 60 * 60 * 1000;


describe('Skill Create operations', () => {
  before(async () => {
    await dbHandler.connect();
  });
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  it('Creates a skill successfully', (done) => {
    const skill = skillRepository.createSkill(skillOne)
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt', (done) => {
    const skill = skillRepository.createSkill(skillOne)
      .then((skill) => {
        assert(skill.createdAt);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt with a recent (current) Datetime', (done) => {
    const skill = skillRepository.createSkill(skillOne)
      .then((skill) => {
        assert(((Date.now()) - new Date(skill.createdAt)) < oneHour);
        done();
      });
  });

  it('Creates a skill must allow `junior` level', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'junior' })
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must allow `senior` level', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'senior' })
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must allow `expert` level', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'expert' })
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must convert level to uppercase', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'senior' })
      .then((skill) => {
        Skill.findOne({ name: 'skill2' })
          .then((skillFounded) => {
            assert(skillFounded.level === 'SENIOR');
            done();
          });
      });
  });

  it('Creates a skill must not allow level AAAA', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'AAAA' })
      .catch((err) => {
        assert(err.errors.level.message === '`AAAA` is not a valid enum value for path `level`.')
        done();
      });
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

});

describe('Skill Delete operations', () => {
  before(async () => {
    await dbHandler.connect();
  });
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  it('Deletes a Skill', (done) => {
    const skill = skillRepository.createSkill({ name: 'skill2', level: 'senior' })
      .then((skill) => {
        skillRepository.deleteSkill(skill.id)
          .then(() => Skill.findOne({ name: 'Skill1' }))
          .then((skillFounded) => {
            assert(skillFounded === null);
            done();
          });
      })
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

});