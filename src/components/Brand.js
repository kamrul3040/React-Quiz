import Classes from "./classes;";
export default function Barnd() {
  return (
    <ul>
      <li>
        <a href="index.html" className={Classes.brand}>
          <img src="./images/logo-bg.png" alt="Learn with Sumit Logo" />
          <h3>Learn with Sumit</h3>
        </a>
      </li>
    </ul>
  );
}
