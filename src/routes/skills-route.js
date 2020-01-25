import { Router } from 'express';
import SkillController from '../controllers/skill-controller';
import validateIdMiddleware from '../middlewares/validateId-middleware';
const router = new Router();

router.get('/skills', (req, res) => {
  SkillController.getAll(req, res);
});

router.get('/skills/:id', validateIdMiddleware, (req, res) => {
  SkillController.getSkill(req, res);
});

router.post('/skills', (req, res) => {
  SkillController.addSkill(req, res);
});

router.put('/skills/:id', validateIdMiddleware, (req, res) => {
  SkillController.updateSkill(req, res);
});

router.delete('/skills/:id', validateIdMiddleware, (req, res) => {
  SkillController.deleteSkill(req, res);
});

export default router;
