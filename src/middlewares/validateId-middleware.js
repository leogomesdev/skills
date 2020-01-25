import mongoose from 'mongoose';

export default (req, res, next) => {
  const validateId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validateId) {
    return res.status(400).send({ error: 'Malformed ID' });
  }
  return next();
};
