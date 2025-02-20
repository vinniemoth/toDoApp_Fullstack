import { useEffect, useState } from "react";
import Header from "../../components/header";
import NewTaskModal from "../../components/NewTaskModal";
import NewSubTaskModal from "../../components/NewSubTaskModal";
import { Plus } from "lucide-react";
import { moduleApi } from "../../Api";
import style from "./Dashboard.module.css";
import TaskPill from "../../components/TaskPill";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

interface ActiveModals {
  taskIsActive: boolean;
  subtaskIsActive: boolean;
  visualizerIsActive: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completionUpdate, setCompletionUpdate] = useState<
    boolean | undefined
  >();
  const [subtaskCompletionUpdate, setSubTaskCompletionUpdate] =
    useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [activeModals, setActiveModals] = useState<ActiveModals>({
    taskIsActive: false,
    subtaskIsActive: false,
    visualizerIsActive: false,
  });

  const handleNewTask = () => {
    setActiveModals((prev) => ({
      ...prev,
      taskIsActive: !prev.taskIsActive,
    }));
  };

  const handleNewSubTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setActiveModals((prev) => ({
      ...prev,
      subtaskIsActive: !prev.subtaskIsActive,
    }));
  };

  const handleVisualization = (taskId: string) => {
    setSelectedTaskId(taskId);
    setActiveModals((prev) => ({
      ...prev,
      visualizerIsActive: !prev.visualizerIsActive,
    }));
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
  }, [completionUpdate, subtaskCompletionUpdate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleToggleCompletion = async (id: string, completed: boolean) => {
    try {
      await moduleApi.modifyTask(id, completed);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: completed } : task
        )
      );
      setCompletionUpdate(!completionUpdate);
    } catch (error) {
      console.log("Erro ao atualizar a tarefa:", error);
    }
  };

  const handleSubtaskCompletion = async (
    id: string,
    subtaskId: string,
    completed: boolean,
    callback: () => void
  ) => {
    try {
      await moduleApi.modifySubTask(id, subtaskId, completed);
      setSubTaskCompletionUpdate(!subtaskCompletionUpdate);
      callback();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <NewTaskModal
        isActive={activeModals.taskIsActive}
        onToggle={handleNewTask}
      />
      <NewSubTaskModal
        taskId={selectedTaskId}
        isActive={activeModals.subtaskIsActive}
        onToggle={() => handleNewSubTask(selectedTaskId)}
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
            handleVisualization={() => handleVisualization(task.id)}
            handleSubtaskCompletion={handleSubtaskCompletion}
          />
        ))}
        <div className={style.plus} onClick={handleNewTask}>
          <Plus />
        </div>
      </div>
    </>
  );
}
