import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../styles/MiniPalyer.module.css";
export default function MiniPlayer(title) {
  const videoUrl = `https://www.youtube.com/watch?v=${title.id}`;
  const videoRef = useRef();
  const [status, setStatus] = useState();

  function toggleMiniPlayer() {
    if (!status) {
      videoRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      videoRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={videoRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      <p>hi</p>
    </div>
  );
}
