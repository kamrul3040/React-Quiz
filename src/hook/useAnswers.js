import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useAnswers(videoID) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [answers, setanswers] = useState([]);
  useEffect(() => {
    async function fetchAnswers() {
      //database rellated work
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      //request firebase database
      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setanswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
    fetchAnswers();
    // console.log(fetchAnswers());
  }, [videoID]);

  return { loading, error, answers };
}
//sumit

// import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
// import { useEffect, useState } from "react";

// export default function useAnswers(videoID) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     async function fetchAnswers() {
//       // database related works
//       const db = getDatabase();
//       const answerRef = ref(db, "answers/" + videoID + "/questions");
//       const answerQuery = query(answerRef, orderByKey());

//       try {
//         setError(false);
//         setLoading(true);
//         // request firebase database
//         const snapshot = await get(answerQuery);
//         setLoading(false);
//         if (snapshot.exists()) {
//           setAnswers((prevAnswers) => {
//             return [...prevAnswers, ...Object.values(snapshot.val())];
//           });
//         }
//       } catch (err) {
//         console.log(err);
//         setLoading(false);
//         setError(true);
//       }
//     }

//     fetchAnswers();
//   }, [videoID]);

//   return {
//     loading,
//     error,
//     answers,
//   };
// }
