import assert from 'assert';
import * as skillRepository from '../../repositories/skill-repository';
const dbHandler = require('../dbHandler');
import * as factory from '../factories';

const oneHour = 60 * 60 * 1000;

describe('Skill Create operations', () => {
  before(async () => {
    await dbHandler.connect();
  });
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  it('Creates a skill successfully', (done) => {
    const skill = skillRepository.createSkill(factory.juniorSkill())
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt', (done) => {
    const skill = skillRepository.createSkill(factory.juniorSkill())
      .then((skill) => {
        assert(skill.createdAt);
        done();
      });
  });

  it('Creates a skill must fill the field createdAt with a recent (current) Datetime', (done) => {
    const skill = skillRepository.createSkill(factory.juniorSkill())
      .then((skill) => {
        assert(((Date.now()) - new Date(skill.createdAt)) < oneHour);
        done();
      });
  });

  it('Creates a skill must allow `junior` level', (done) => {
    const skill = skillRepository.createSkill(factory.juniorSkill())
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must allow `senior` level', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must allow `expert` level', (done) => {
    const skill = skillRepository.createSkill(factory.expertSkill())
      .then((skill) => {
        assert(!skill.isNew);
        done();
      });
  });

  it('Creates a skill must convert level to uppercase', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkillLowercase())
      .then((skill) => {
        skillRepository.getSkill(skill.id)
          .then((skillFounded) => {
            assert(skillFounded.level === 'SENIOR');
            done();
          });
      });
  });

  it('Creates a skill must not allow level AAAA', (done) => {
    const skill = skillRepository.createSkill(factory.invalidSkill())
      .catch((err) => {
        assert(err.errors.level.message === '`AAAA` is not a valid enum value for path `level`.')
        done();
      });
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

});

describe('Skill Read operations', () => {
  before(async () => {
    await dbHandler.connect();
  });
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  it('Get a Skill by id', (done) => {
    const seniorSkill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.getSkill(skill.id)
          .then((skillFounded) => {
            assert(skillFounded.name === 'seniorSkill');
            done();
          });
      });
  });

  it('List all skills', (done) => {
    const juniorSkill = skillRepository.createSkill(factory.juniorSkill());
    const seniorSkill = skillRepository.createSkill(factory.seniorSkill())
      .then(() => {
        skillRepository.listSkills()
          .then((skillsFounded) => {
            assert(skillsFounded.length == 2);
            done();
          });
      });
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });
});

describe('Skill Update operations', () => {
  before(async () => {
    await dbHandler.connect();
  });
  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  it('Updates a Skill must allow to update the name', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.updateSkill(skill.id, { name: 'newName' })
          .then(() => skillRepository.getSkill(skill.id)
            .then((skillFounded) => {
              assert(skillFounded.name === 'newName');
              done();
            }));
      });
  });

  it('Updates a Skill must allow to update the level to another valid level', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.updateSkill(skill.id, { level: 'EXPERT' })
          .then(() => skillRepository.getSkill(skill.id)
            .then((skillFounded) => {
              assert(skillFounded.level === 'EXPERT');
              done();
            }));
      });
  });

  it('Updates a Skill must allow to update name and level', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.updateSkill(skill.id, { name: 'updated name', level: 'EXPERT' })
          .then(() => skillRepository.getSkill(skill.id)
            .then((skillFounded) => {
              assert(skillFounded.name === 'updated name');
              assert(skillFounded.level === 'EXPERT');
              done();
            }));
      });
  });

  it('Updates a Skill must not allow invalid level', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.updateSkill(skill.id, { level: 'INVALID' })
          .catch((err) => {
            assert(err.errors.level.message === '`INVALID` is not a valid enum value for path `level`.')
            done();
          });
      });
  });

  it('Updates a Skill must not allow empty name', (done) => {
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.updateSkill(skill.id, { name: '' })
          .catch((err) => {
            assert(err.errors.name.message === 'Path `name` is required.')
            done();
          });
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
    const skill = skillRepository.createSkill(factory.seniorSkill())
      .then((skill) => {
        skillRepository.deleteSkill(skill.id)
          .then(() => skillRepository.getSkill(skill.id)
            .then((skillFounded) => {
              assert(skillFounded === null);
              done();
            }));
      });
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

});