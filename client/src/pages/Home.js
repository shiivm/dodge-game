import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { addScore, getScore } from "../action/scoreActions";

import { Container, Button } from "react-bootstrap";

import Ship from "../gameComponents/Ship";
import Score from "../gameComponents/Score";
import Obstacles from "../gameComponents/Obstacles";

import GameOver from "../component/GameOver";

const ALLOWED_KEYS = [37, 38, 39, 40];
const WIDTH = 320;
const HEIGHT = 180;

const Home = (props) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const requestRef = useRef(null);
  const shipRef = useRef(null);
  const scoreRef = useRef(null);

  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(100);
  const [obstacles, setObstacles] = useState([]);
  const [frameNo, setFrameNo] = useState(0);
  const [pause, setPause] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    props.getScore();
    window.addEventListener("keyup", handleKeys);
    window.addEventListener("keydown", handleKeys);
    gameArea();
    shipRef.current = new Ship({
      color: "red",
      width: 30,
      height: 30,
      x: 0,
      y: 75,
    });
    scoreRef.current = new Score({
      type: "text",
      color: "black",
      width: "25px",
      height: "Consolas",
      x: 180,
      y: 25,
    });
    startGame();
    return () => {
      window.removeEventListener("keyup", handleKeys);
      window.removeEventListener("keydown", handleKeys);
      stopGame();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateObstacles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameNo]);
  useEffect(() => {
    setHighScore(props.highScore);
  }, [props.highScore]);
  const startGame = () => {
    requestRef.current = requestAnimationFrame(startGame);
    setPause(false);
    setFrameNo((frameNo) => frameNo + 1);
  };
  const stopGame = () => {
    cancelAnimationFrame(requestRef.current);
    setPause(true);
    props.addScore({ score: score });
  };
  const clear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  const updateObstacles = () => {
    let x, min, max, height, gap;
    for (let i = 0; i < obstacles.length; i++) {
      if (shipRef.current.crashWith(obstacles[i])) {
        stopGame();
        return;
      }
    }
    if (!pause) {
      setScore((score) => score + 1);
      if (frameNo === 1 || everyinterval(150)) {
        x = WIDTH;
        min = 20;
        max = 100;
        height = Math.floor(Math.random() * (max - min + 1) + min);
        min = 100;
        max = 200;
        gap = Math.floor(Math.random() * (max - min + 1) + min);
        let newObstacleUp = new Obstacles({
          color: "green",
          width: 10,
          height: height,
          x: x,
          y: 0,
        });
        let newObstacleDown = new Obstacles({
          color: "green",
          width: 10,
          height: x - height - gap,
          x: x,
          y: height + gap,
        });
        setObstacles((obstacles) => [...obstacles, newObstacleUp]);
        setObstacles((obstacles) => [...obstacles, newObstacleDown]);
      }
      updateGameArea();
    }
  };
  const everyinterval = (n) => {
    if ((frameNo / n) % 1 === 0) {
      return true;
    }
    return false;
  };

  const updateGameArea = () => {
    clear();
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x -= 1;
      obstacles[i].update(contextRef.current);
    }
    scoreRef.current.text = "SCORE " + score;
    scoreRef.current.update(contextRef.current);
    shipRef.current.x = speedX;
    shipRef.current.y = speedY;
    shipRef.current.update(contextRef.current);
  };
  const handleKeys = (e) => {
    e.preventDefault();
    if (ALLOWED_KEYS.includes(e.keyCode) && !pause) {
      moveGamePiece(e.keyCode);
    }
  };
  const moveGamePiece = (code) => {
    if (pause) return false;
    switch (code) {
      case 37:
        setSpeedX((speedX) => speedX - 1);
        break;
      case 38:
        setSpeedY((speedY) => speedY - 1);
        break;
      case 39:
        setSpeedX((speedX) => speedX + 1);
        break;
      case 40:
        setSpeedY((speedY) => speedY + 1);
        break;
      default:
        break;
    }
  };

  const gameArea = () => {
    const canvas = canvasRef.current;
    canvas.style.border = "1px solid red";
    const context = canvas.getContext("2d");
    contextRef.current = context;
  };

  return (
    <Container>
      <p className="instructions">
        Click the buttons or press the arrow keys to move the red square:
      </p>
      <p>
        <strong>Highest Score : </strong>
        {highScore > score ? highScore : score}
      </p>
      {pause && <GameOver />}
      <canvas ref={canvasRef} width={`${WIDTH}px`} height={`${HEIGHT}px`} />
      <div className="controls">
        <Button
          variant="primary"
          className="btn-up-down"
          onMouseDown={() => moveGamePiece(38)}
        >
          UP
        </Button>
        <br />
        <br />
        <Button
          variant="primary"
          className="btn-left"
          onMouseDown={() => moveGamePiece(37)}
        >
          LEFT
        </Button>
        <Button variant="primary" onMouseDown={() => moveGamePiece(39)}>
          RIGHT
        </Button>
        <br />
        <br />
        <Button
          variant="primary"
          className="btn-up-down"
          onMouseDown={() => moveGamePiece(40)}
        >
          DOWN
        </Button>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    highScore: state.score.highScore,
    error: state.error.itemError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScore: (data) => dispatch(addScore(data)),
    getScore: () => dispatch(getScore()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
