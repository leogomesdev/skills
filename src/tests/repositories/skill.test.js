import assert from 'assert';
import * as factory from '../factories';
import * as skillRepository from '../../repositories/skill-repository';
const dbHandler = require('../dbHandler');

const oneHour = 60 * 60 * 1000;

describe('Skill CRUD operations', function() {
  before(async function() {
    await dbHandler.connect();
  });
  afterEach(async function() {
    await dbHandler.clearDatabase();
  });

  it('Creates a skill successfully', function(done) {
    skillRepository.createSkill(factory.juniorSkill()).then(skill => {
      assert(!skill.isNew);
      done();
    });
  });

  it('Creates a skill must fill the field createdAt', function(done) {
    skillRepository.createSkill(factory.juniorSkill()).then(skill => {
      assert(skill.createdAt);
      done();
    });
  });

  it('Creates a skill must fill the field createdAt with a recent (current) Datetime', function(done) {
    skillRepository.createSkill(factory.juniorSkill()).then(skill => {
      assert(Date.now() - new Date(skill.createdAt) < oneHour);
      done();
    });
  });

  it('Creates a skill must allow `junior` level', function(done) {
    skillRepository.createSkill(factory.juniorSkill()).then(skill => {
      assert(!skill.isNew);
      done();
    });
  });

  it('Creates a skill must allow `senior` level', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      assert(!skill.isNew);
      done();
    });
  });

  it('Creates a skill must allow `expert` level', function(done) {
    skillRepository.createSkill(factory.expertSkill()).then(skill => {
      assert(!skill.isNew);
      done();
    });
  });

  it('Creates a skill must convert level to uppercase', function(done) {
    skillRepository.createSkill(factory.seniorSkillLowercase()).then(skill => {
      skillRepository.getSkill(skill.id).then(skillFounded => {
        assert(skillFounded.level === 'SENIOR');
        done();
      });
    });
  });

  it('Creates a skill must not allow level AAAA', function(done) {
    skillRepository.createSkill(factory.invalidSkill()).catch(err => {
      assert(
        err.errors.level.message ===
          '`AAAA` is not a valid enum value for path `level`.'
      );
      done();
    });
  });

  it('Get a Skill by id', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.getSkill(skill.id).then(skillFounded => {
        assert(skillFounded.name === 'seniorSkill');
        done();
      });
    });
  });

  it('List all skills', function(done) {
    skillRepository.createSkill(factory.juniorSkill());
    skillRepository.createSkill(factory.seniorSkill()).then(() => {
      skillRepository.listSkills().then(skillsFounded => {
        assert(skillsFounded.length === 2);
        done();
      });
    });
  });

  it('Updates a Skill must allow to update the name', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.updateSkill(skill.id, { name: 'newName' }).then(() =>
        skillRepository.getSkill(skill.id).then(skillFounded => {
          assert(skillFounded.name === 'newName');
          done();
        })
      );
    });
  });

  it('Updates a Skill must allow to update the level to another valid level', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.updateSkill(skill.id, { level: 'EXPERT' }).then(() =>
        skillRepository.getSkill(skill.id).then(skillFounded => {
          assert(skillFounded.level === 'EXPERT');
          done();
        })
      );
    });
  });

  it('Updates a Skill must allow to update name and level', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository
        .updateSkill(skill.id, { name: 'updated name', level: 'EXPERT' })
        .then(() =>
          skillRepository.getSkill(skill.id).then(skillFounded => {
            assert(skillFounded.name === 'updated name');
            assert(skillFounded.level === 'EXPERT');
            done();
          })
        );
    });
  });

  it('Updates a Skill must not allow invalid level', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.updateSkill(skill.id, { level: 'INVALID' }).catch(err => {
        assert(
          err.errors.level.message ===
            '`INVALID` is not a valid enum value for path `level`.'
        );
        done();
      });
    });
  });

  it('Updates a Skill must not allow empty name', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.updateSkill(skill.id, { name: '' }).catch(err => {
        assert(err.errors.name.message === 'Path `name` is required.');
        done();
      });
    });
  });

  it('Deletes a Skill', function(done) {
    skillRepository.createSkill(factory.seniorSkill()).then(skill => {
      skillRepository.deleteSkill(skill.id).then(() =>
        skillRepository.getSkill(skill.id).then(skillFounded => {
          assert(skillFounded === null);
          done();
        })
      );
    });
  });

  after(async function() {
    await dbHandler.closeDatabase();
  });
});
