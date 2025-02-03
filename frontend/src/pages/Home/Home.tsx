import { Link } from "react-router-dom";
import Header from "../../components/header";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>
        <h1>Sua tasklist definitiva.</h1>
        <div className={style.buttons}>
          <Link to="/login">
            <button className={style.send}>Começar</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
