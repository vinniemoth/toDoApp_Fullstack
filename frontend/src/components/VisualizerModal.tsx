import React, { useEffect, useState } from "react";
import style from "./NewTaskModal.module.css";
import { moduleApi } from "../Api";
// import { moduleApi } from "../Api";

interface SubTask {
  id: string;
  subtask: string;
  completed: boolean;
  todoId: string;
}

interface VisualizerModal {
  taskId: string;
  isActive: boolean;
  onToggle: () => void;
}

export default function VisualizerModal(props: VisualizerModal) {
  const [subtasks, setSubTasks] = useState<SubTask[]>([]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onToggle();
    }
  };

  const fetchSubTasks = async () => {
    try {
      const json: SubTask[] = await moduleApi.fetchSubTasks(props.taskId);
      if (!json) {
        console.log("Não foram encontradas subtarefas.");
      }
      setSubTasks(json);
      console.log(subtasks);
    } catch (err) {
      console.error("Erro ao buscar subtarefas", err);
    }
  };

  useEffect(() => {
    if (props.isActive) {
      fetchSubTasks();
    }
  }, [props.isActive, props.taskId]);

  return (
    <div
      className={props.isActive ? style.active : style.hidden}
      onClick={handleBackdropClick}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1>Subtarefas</h1>
        <div className={style.subtasksWrapper}>
          {subtasks.map((subtask) => (
            <div key={subtask.id} className={style.subtaskItem}>
              <div className={style.subtaskTextContainer}>
                <p className={style.taskName}>{subtask.subtask}</p>
                <span
                  className={
                    subtask.completed ? style.completed : style.pending
                  }
                >
                  {subtask.completed ? "Concluída" : "Pendente"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
