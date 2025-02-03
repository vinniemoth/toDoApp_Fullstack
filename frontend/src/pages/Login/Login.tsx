import { Link } from "react-router-dom";
import Header from "../../components/header";
import style from "./Login.module.css";
import { AtSign, Lock } from "lucide-react";

export default function Login() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.login_box}>
          <h2>Fazer Login</h2>
          <form className={style.login_form} action="">
            <label className={style.inputContainer} htmlFor="email">
              <input
                placeholder="Email"
                className={style.input}
                type="email"
                name="email"
              />
              <AtSign color="rgba(0,0,0,0.7)" className={style.icon} />
            </label>
            <label className={style.inputContainer} htmlFor="password">
              <input
                placeholder="Password"
                className={style.input}
                type="password"
                name="password"
              />
              <Lock color="rgba(0,0,0,0.7)" className={style.icon} />
            </label>
            <button className={style.send}>Entrar</button>
            <p>Ainda não tem conta?</p>
            <Link to="/signup" className={style.signup}>
              Registre-se!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
