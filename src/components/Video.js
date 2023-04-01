import classes from "../styles/Video.module.css";
export default function Video({ title, id, noq }) {
  return (
    <div className={classes.video}>
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt={title} />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Question</p>
        <p>Total Point : {noq * 5}</p>
      </div>
    </div>
  );
}
