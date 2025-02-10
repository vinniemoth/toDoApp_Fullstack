import { useEffect, useState } from "react";
import Header from "../../components/header";
import { Plus } from "lucide-react";
import { moduleApi } from "../../Api";
import style from "./Dashboard.module.css";

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const json: Task[] = await moduleApi.fetchTasks();
        setTasks(json);
        console.log("Fetched Tasks:", json);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);
  return (
    <>
      <Header />
      <div>
        {tasks.map((task) => (
          <div key={task.id} className={style.taskContainer}>
            <h2>{task.task}</h2>
            <div className={style.singleTask}>
              <div className={style.plus}>
                <Plus />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
