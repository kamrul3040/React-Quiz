import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hook/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

import _ from "lodash";
export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);
  console.log(qna);
  // answer =1
  // option =1
  //correctIndex = 1
  //checkedIndex=1; answe [a.index1]=> option[o.index]=> checked =true=> arry [o.index]

  function calculate() {
    let score = 0;

    answers.forEach((answer, index1) => {
      let correctIndex = [],
        checkedIndex = [];
      answer.options.forEach((option, index2) => {
        if (option.correct) correctIndex.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });
      console.log(correctIndex);
      console.log(checkedIndex);
      if (_.isEqual(correctIndex, checkedIndex)) {
        score = score + 5;
      }
    });
    return score;
  }
  const userScore = calculate();
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
