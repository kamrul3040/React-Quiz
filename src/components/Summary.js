import Image from "../assets/images/success.png";
import classes from "../styles/Summary.module.css";
export default function Summary() {
  return (
    <div className={classes.summary}>
      <div classNAme={classes.point}>
        {" "}
        <p className={classes.score}>
          Your score is <br />5 out of 10
        </p>
      </div>
      <div className={classes.badge}>
        <img src={Image} alt="Success" />
      </div>
    </div>
  );
}
