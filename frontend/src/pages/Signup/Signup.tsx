import { Link } from "react-router-dom";
import Header from "../../components/header";
import style from "./Signup.module.css";
import { AtSign, Lock } from "lucide-react";

export default function Signup() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.register_box}>
          <h2>Criar conta</h2>
          <form className={style.register_form} action="">
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
            <button className={style.send}>Registrar</button>
            <p>Já tem uma conta?</p>
            <Link to="/login" className={style.login}>
              Entrar!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
