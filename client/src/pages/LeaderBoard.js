import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getScore } from "../action/scoreActions";

import { ListGroup, Container, Row, Col } from "react-bootstrap";

const LeaderBoard = (props) => {
  const [scores, setScores] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    props.getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setScores(props.scores);
    if (props.scores.length === 0) {
      setErrorMsg("No items");
    } else {
      setErrorMsg("");
    }
  }, [props.scores]);
  return (
    <Container>
      {errorMsg && (
        <Row>
          <Col className="text-center">{errorMsg}</Col>
        </Row>
      )}
      {scores && scores.length > 0 && (
        <ListGroup>
          <ListGroup.Item><strong>Scores</strong></ListGroup.Item>
          {(scores || []).map((score,i) => {
            return <ListGroup.Item key={i} >{score.score}</ListGroup.Item>;
          })}
        </ListGroup>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    scores: state.score.scores,
    error: state.error.itemError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getScore: () => dispatch(getScore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
