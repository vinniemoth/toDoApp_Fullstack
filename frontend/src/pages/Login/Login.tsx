import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import style from "./Login.module.css";
import { AtSign, Lock } from "lucide-react";
import { moduleApi } from "../../Api";

export default function Login() {
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const json = await moduleApi.userLogin(email, password);
      console.log("Response", json);
      if (json.token) {
        localStorage.setItem("token", json.token);
        navigate("/dashboard");
      } else {
        alert("Login falhou. Cheque suas informações.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro");
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.login_box}>
          <h2>Fazer Login</h2>
          <form className={style.login_form} action="" onSubmit={loginHandler}>
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
