const express = require('express');
const router = express.Router();
const { addProblem, getAllProblems, getProblem, checkProblem } = require('../controllers/problems');
const { auth, isAdmin } = require("../middlewares/auth");

router.post('/addProblem', auth, isAdmin, addProblem);
router.get('/getAllProblems', getAllProblems);
router.get('/getProblem/:id', getProblem);
router.post('/checkProblem/:slug', checkProblem);

module.exports = router;