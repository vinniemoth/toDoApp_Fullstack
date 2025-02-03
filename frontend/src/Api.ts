export const moduleApi = {
  createAccount: async (NAME: string, EMAIL: string, PASSWORD: string) => {
    let response = await fetch("/*link da api*/", {
      method: "POST",
      body: JSON.stringify({
        NAME,
        EMAIL,
        PASSWORD,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let json = await response.json();
    console.log(json);
    return json;
  },
};
