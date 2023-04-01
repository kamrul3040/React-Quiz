import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useQuestion(videoID) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [questions, setquestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      //database rellated work
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const questionQuery = query(quizRef, orderByKey());

      //request firebase database
      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(questionQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setquestions((prevquestions) => {
            return [...prevquestions, ...Object.values(snapshot.val())];
          });
          console.log(snapshot.val());
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [videoID]);
  return { loading, error, questions };
}
