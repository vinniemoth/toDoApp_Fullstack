import React from "react";
import style from "./NewTaskModal.module.css";
import { moduleApi } from "../Api";

interface NewSubTaskModalProps {
  taskId: string;
  subTaskIsActive: boolean;
  onToggle: () => void;
}

export default function NewSubTaskModal(props: NewSubTaskModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onToggle();
    }
  };

  const createSubTask = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const subTask = formData.get("subTaskName") as string;

    if (subTask && props.taskId) {
      let json = await moduleApi.createSubTask(props.taskId, subTask);
      if (json) {
        console.log(json);
        alert("Tarefa criada com sucesso.");
        props.onToggle();
      } else {
        alert("Erro ao criar sub-tarefa.");
      }
    } else {
      alert("Insira um nome para a tarefa");
    }
  };

  return (
    <div
      className={props.subTaskIsActive ? style.active : style.hidden}
      onClick={handleBackdropClick}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={createSubTask} className={style.modalForm}>
          <label htmlFor="taskName">Nome da sub-tarefa</label>
          <input
            type="text"
            id="subTaskName"
            name="subTaskName"
            autoComplete="off"
          />
          <button className={style.button} type="submit">
            CRIAR
          </button>
        </form>
      </div>
    </div>
  );
}
