import { Link } from "react-router-dom";
import useVideoList from "../hook/useVideoList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
export default function Videos() {
  const [loading, error, videos] = useVideoList();
  return (
    <div className={classes.videos}>
      {videos.length > 0 &&
        videos.map((video) => (
          <Link to={"/quiz"} key={video.youtubeId}>
            <Video title={video.title} id={video.youtubeId} noq={video.noq} />
          </Link>
        ))}
      {!loading && videos.length === 0 && <div> No Data Found</div>}
      {error && <div>There Was an error</div>}
      {loading && <div>Loading...</div>}}
    </div>
  );
}
