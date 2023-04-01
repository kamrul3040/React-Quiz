import classes from "../styles/Button.module.css";
export default function Button({ className, children, ...rest }) {
  return (
    <button className={classes.button} {...rest}>
      {children}
    </button>
  );
}
//sumit

// import classes from "../styles/Button.module.css";

// export default function Button({ className, children }) {
//   return <div className={`${classes.button} ${className}`}>{children}</div>;
// }
