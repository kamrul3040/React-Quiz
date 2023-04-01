import { useNavigate, useParams } from "react-router-dom";
import useAnswers from "../../hook/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";
export default function Result() {
  const { id } = useParams();
  const { location } = useNavigate();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);
  // console.log(qna);
  console.log(state);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary />
          <Analysis />
        </>
      )}
    </>
  );
}
