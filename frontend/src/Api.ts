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
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
    let json = response.json();
    return json;
  },
};
