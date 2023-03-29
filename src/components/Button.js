import classes from "../styles/Button.module.css";
export default function Button({ children }) {
  return <Button className={classes.button}>{children}</Button>;
}
