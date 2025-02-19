import { useEffect, useState } from "react";
import Header from "../../components/header";
import NewTaskModal from "../../components/NewTaskModal";
import VisualizerModal from "../../components/VisualizerModal";
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
  const [completionUpdate, setCompletionUpdate] = useState<boolean>(false);
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
  }, [completionUpdate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

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
      <NewTaskModal
        isActive={activeModals.taskIsActive}
        onToggle={handleNewTask}
      />
      <NewSubTaskModal
        taskId={selectedTaskId}
        isActive={activeModals.subtaskIsActive}
        onToggle={() => handleNewSubTask(selectedTaskId)}
      />
      <VisualizerModal
        taskId={selectedTaskId}
        isActive={activeModals.visualizerIsActive}
        onToggle={() => handleVisualization(selectedTaskId)}
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
          />
        ))}
        <div className={style.plus} onClick={handleNewTask}>
          <Plus />
        </div>
      </div>
    </>
  );
}
