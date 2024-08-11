const express = require('express');
const { createContest, addUser, addScore, getLeaderBoard, getProblems, getContest, getContestById, addProblemToContest } = require('../controllers/contest');
const router = express.Router();
const { auth } = require('../middlewares/auth');

router.post('/createContest', auth, createContest);
router.put('/addProblemToContest', auth, addProblemToContest);
router.get('/getContests', getContest);
router.get('/goToContest/:id', auth, getContestById);
router.post('/addUser', auth, addUser);
router.post('/addScore', auth, addScore);
router.get('/getLeaderboard/:id', auth, getLeaderBoard);
router.get('/getProblems/:id', auth, getProblems);

module.exports = router; 