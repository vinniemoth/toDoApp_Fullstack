import { useEffect, useState } from "react";
import Header from "../../components/header";
import NewTaskModal from "../../components/NewTaskModal";
import { Plus } from "lucide-react";
import { moduleApi } from "../../Api";
import style from "./Dashboard.module.css";
import TaskPill from "../../components/TaskPill";
import NewSubTaskModal from "../../components/NewSubTaskModal";

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [subTaskIsActive, setSubTaskIsActive] = useState<boolean>(false);
  const [completionUpdate, setCompletionUpdate] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const handleNewTask = () => {
    setIsActive(!isActive);
  };

  const handleNewSubTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setSubTaskIsActive(!subTaskIsActive);
  };

  const fetchTasks = async () => {
    try {
      const json: Task[] = await moduleApi.fetchTasks();
      setTasks(json);
      console.log("Fetched Tasks:", json);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [completionUpdate]);

  const handleToggleCompletion = async (id: string, completed: boolean) => {
    try {
      await moduleApi.modifyTask(id, completed);
      setCompletionUpdate(!completionUpdate);
    } catch (error) {
      console.log("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <>
      <Header />
      <NewTaskModal isActive={isActive} onToggle={handleNewTask} />
      <NewSubTaskModal
        taskId={selectedTaskId}
        subTaskIsActive={subTaskIsActive}
        onToggle={() => setSubTaskIsActive(!subTaskIsActive)}
      />
      <div className={style.wrapper}>
        {tasks.map((task) => (
          <TaskPill
            key={task.id}
            id={task.id}
            task={task.task}
            completed={task.completed}
            onToggleCompletion={handleToggleCompletion}
            handleNewSubTask={() => handleNewSubTask(task.id)}
          />
        ))}
        <div className={style.plus} onClick={handleNewTask}>
          <Plus />
        </div>
      </div>
    </>
  );
}
