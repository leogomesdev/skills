import { Router } from 'express';
import SkillController from '../controllers/skillController';
const router = new Router();

// Get all Skills
router.get('/skills', (req, res) => {
  SkillController.getAll(req, res);
});

// Get one skill by id
router.get('/skills/:skillId', (req, res) => {
  SkillController.getSkill(req, res);
});

// Add a new Skill
router.post('/skills', (req, res) => {
  SkillController.addSkill(req, res);
});

router.put('/skills/:skillId', (req, res) => {
  SkillController.updateSkill(req, res);
});

// Delete a skill by id
router.delete('/skills/:skillId', (req, res) => {
  SkillController.deleteSkill(req, res);
});

export default router;