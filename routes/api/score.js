const express = require('express');
const router = express.Router();

const ScoreController = require('../../controller/scoreController');

/**
 * @route GET api/score
 * @desc Get All Scores 
 * @access Protected
 */
router.get('/',ScoreController.fetchScores);

/**
 * @route POST api/score
 * @desc Add a score 
 * @access Protected
 */
router.post('/',ScoreController.addScore);

module.exports = router;