export const moduleApi = {
  createAccount: async (name: string, email: string, password: string) => {
    let response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    let json = await response.json();
    return json;
  },

  userLogin: async (email: string, password: string) => {
    let response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(response);
    let json = await response.json();

    return json;
  },

  fetchTasks: async () => {
    let token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
    let json = response.json();
    return json;
  },

  createTask: async (task: string) => {
    let token = localStorage.getItem("token");
    let response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        task,
      }),
    });
    let json = response.json();
    return json;
  },

  modifyTask: async (id: string, completed: boolean) => {
    let token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        completed,
      }),
    });
    let json = response.json();
    return json;
  },

  createSubTask: async (todoId: string, subtask: string) => {
    let token = localStorage.getItem("token");
    let response = await fetch(
      `http://localhost:5000/tasks/${todoId}/subtask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          subtask,
        }),
      }
    );
    let json = response.json();
    return json;
  },

  fetchSubTasks: async (todoId: string) => {
    let token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/tasks/${todoId}/subtask`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    let json = response.json();
    return json;
  },
};
