import React from "react";
import style from "./NewTaskModal.module.css";
import { moduleApi } from "../Api";

interface NewTaskModalProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function NewTaskModal(props: NewTaskModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onToggle();
    }
  };

  const createTask = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const task = formData.get("taskName") as string;

    if (task) {
      let json = await moduleApi.createTask(task);
      if (json) {
        alert("Tarefa criada com sucesso.");
        props.onToggle();
      } else {
        alert("Erro ao criar tarefa.");
      }
    } else {
      alert("Insira um nome para a tarefa");
    }
  };

  return (
    <div
      className={props.isActive ? style.active : style.hidden}
      onClick={handleBackdropClick}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={createTask} className={style.modalForm}>
          <label htmlFor="taskName">Nome da tarefa</label>
          <input type="text" id="taskName" name="taskName" autoComplete="off" />
          <button className={style.button} type="submit">
            CRIAR
          </button>
        </form>
      </div>
    </div>
  );
}
