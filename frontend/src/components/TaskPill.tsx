import { Check, Ellipsis, Plus, X } from "lucide-react";
import style from "./taskPill.module.css";
import { useEffect, useState } from "react";
import { moduleApi } from "../Api";

interface taskPillProps {
  id: string;
  task: string;
  completed: boolean;
  onToggleCompletion: (id: string, completed: boolean) => void;
  handleNewSubTask: () => void;
  handleVisualization: () => void;
}

interface SubTask {
  id: string;
  subtask: string;
  completed: boolean;
  todoId: string;
}

export default function TaskPill(props: taskPillProps) {
  const [completed, setCompleted] = useState(props.completed);
  const [subtasks, setSubTasks] = useState<SubTask[]>([]);

  const toggleCompletion = async () => {
    setCompleted(!completed);
    await moduleApi.modifyTask(props.id, completed);
  };

  const fetchSubTasks = async () => {
    try {
      const json: SubTask[] = await moduleApi.fetchSubTasks(props.id);
      setSubTasks(json);
    } catch (error) {
      console.error("Erro ao buscar subtarefas:", error);
    }
  };

  useEffect(() => {
    fetchSubTasks();
  }, []);

  return (
    <div key={props.id} className={style.taskContainer}>
      <h2>{props.task}</h2>
      <div className={style.singleTask}>
        <div className={style.task} onClick={toggleCompletion}>
          {completed ? <Check size={50} /> : <Ellipsis size={50} />}
        </div>
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className={style.subtaskCircle}
            style={{ backgroundColor: subtask.completed ? "green" : "red" }}
            onClick={props.handleVisualization}
          >
            {subtask.completed ? <Check /> : <X />}
          </div>
        ))}
        <div className={style.plus} onClick={props.handleNewSubTask}>
          <Plus />
        </div>
      </div>
    </div>
  );
}
