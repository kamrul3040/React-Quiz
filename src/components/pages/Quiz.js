import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestions from "../../hook/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import { useAuth } from "./../../contexts/AuthContext";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);
  function handleChangeAnswer(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  // next question button
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  }
  // prev question button
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length)
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  }
  // submit question button
  async function submitQuestion() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `/result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }
  console.log(navigate.qna);
  // percentenge
  const persentenge =
    currentQuestion > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading....</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleChangeAnswer}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={persentenge}
            submit={submitQuestion}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
