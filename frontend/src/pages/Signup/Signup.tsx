import { Link } from "react-router-dom";
import Header from "../../components/header";
import style from "./Signup.module.css";
import { AtSign, Lock, User } from "lucide-react";
import { moduleApi } from "../../Api";

export default function Signup() {
  const submitHandler = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.usuario as HTMLInputElement;
    const email = form.email as HTMLInputElement;
    const password = form.password as HTMLInputElement;

    if (name.value && email.value && password.value) {
      let json = await moduleApi.createAccount(
        name.value,
        email.value,
        password.value
      );
      if (json) {
        alert("Criação bem sucedida!");
      } else {
        alert("Erro na criação");
      }
    } else {
      alert("Insira todos os dados");
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.register_box}>
          <h2>Criar conta</h2>
          <form className={style.register_form} onSubmit={submitHandler}>
            <label className={style.inputContainer} htmlFor="name">
              <input
                placeholder="Name"
                className={style.input}
                type="text"
                name="name"
              />
              <User color="rgba(0,0,0,0.7)" className={style.icon} />
            </label>
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
