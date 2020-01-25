import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { juniorSkill, seniorSkill } from '../factories';
import Skill from '../../models/skill';

chai.use(chaiHttp);
chai.should();

describe('/api/skills', function() {
  describe('GET', function() {
    it('should get all skills', function(done) {
      Skill.create(seniorSkill()).then(() => {
        Skill.create(juniorSkill()).then(() => {
          Skill.find({}).then(allSkills => {
            chai
              .request(app)
              .get('/api/skills')
              .end((_err, res) => {
                res.should.have.status(200);
                expect(JSON.stringify(res.body)).to.eql(
                  JSON.stringify({ skills: allSkills })
                );
                done();
              });
          });
        });
      });
    });
    it('should get one skill by id', function(done) {
      Skill.create(seniorSkill()).then(() => {
        Skill.create(juniorSkill()).then(juniorSkill => {
          Skill.find({}).then(() => {
            chai
              .request(app)
              .get(`/api/skills/${juniorSkill.id}`)
              .end((_err, res) => {
                res.should.have.status(200);
                expect(JSON.stringify(res.body)).to.eql(
                  JSON.stringify({ skill: juniorSkill })
                );
                done();
              });
          });
        });
      });
    });
    it('Should return 404 and empty response when skill is not found', function(done) {
      const id = '5e0e98d40aa08c482d5e2759';
      chai
        .request(app)
        .get(`/api/skills/${id}`)
        .end((_err, res) => {
          res.should.have.status(404);
          res.body.should.be.eql({});
          done();
        });
    });
    it('should return array with empty data when trying to get all skills and no one exists', function(done) {
      Skill.find({}).then(allSkills => {
        chai
          .request(app)
          .get('/api/skills')
          .end((_err, res) => {
            res.should.have.status(200);
            expect(JSON.stringify(res.body)).to.eql(
              JSON.stringify({ skills: allSkills })
            );
            done();
          });
      });
    });
    it('Should return 400 when id is not valid and error message', function(done) {
      const id = '5e0e98d4';
      chai
        .request(app)
        .get(`/api/skills/${id}`)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: 'Malformed ID' });
          done();
        });
    });
  });
  describe('DELETE', function() {
    it('Should return 404 when skill is not found by informed id', function(done) {
      const id = '5e0e98d40aa08c482d5e2759';
      chai
        .request(app)
        .delete(`/api/skills/${id}`)
        .end((_err, res) => {
          res.should.have.status(404);
          res.body.should.be.eql({});
          done();
        });
    });
    it('Should return 400 when id is not valid', function(done) {
      const id = '5e0e98d4';
      chai
        .request(app)
        .delete(`/api/skills/${id}`)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: 'Malformed ID' });
          done();
        });
    });
    it('Should return 204 when deleted with success', function(done) {
      Skill.create(juniorSkill()).then(juniorSkill => {
        chai
          .request(app)
          .delete(`/api/skills/${juniorSkill.id}`)
          .end((_err, res) => {
            res.should.have.status(204);
            res.body.should.be.eql({});
            Skill.findById(juniorSkill.id).then(skill => {
              chai.assert.notExists(skill);
              done();
            });
          });
      });
    });
  });
});
