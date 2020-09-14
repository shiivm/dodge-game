const Score = require("../models/scoreModel");

exports.fetchScores = async (req, res) => {
  try {
    let queryConds = {userId : req.userInfo._id};

    const scores = await Score.find(queryConds).populate('userId',{email:true}).sort({ score: -1 });
    if (!scores || (scores && scores.length == 0)) throw Error("No scores");

    res.status(200).json(scores);
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};

exports.addScore = async (req, res) => {
  const newScore = new Score({
    score: req.body.score,
    userId : req.userInfo._id,
  });
  try {
    const score = await newScore.save();
    if (!score) throw Error("Something went wrong saving the score");
    res.status(200).json({score : score, message : "New score added successfully"});
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};
