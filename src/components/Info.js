import classes from "../styles/Info.module.css";
export default function Info({ children }) {
  return <div className={classes.info}>{children}</div>;
}
