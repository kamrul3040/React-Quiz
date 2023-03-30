import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useVideoList() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [viedeos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      //database rellated work
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      const videoQuery = query(videoRef, orderByKey());

      //request firebase database
      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          // setVideos((prevVideos) => {
          //   return [...prevVideos, ...Object.values(snapshot.val())];

          // });
          console.log(snapshot.val());
          JSON.parse(snapshot.val());
        } else {
          // setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, []);
  return { loading, error, viedeos };
}
