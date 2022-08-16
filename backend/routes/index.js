import express from 'express';
import authenticateToken from './helpers/auth.js';

const router = express.Router();

router.get('/time', authenticateToken, (req, res) => {
  res.send({
    epoch: {
      description: 'The current server time, in epoch seconds, at time of processing the request.',
      timeEpoch: Math.floor(+new Date() / 1000),
    },
  });
});

export default router;
