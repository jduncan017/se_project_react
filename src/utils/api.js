const api = async (method, data = null, id = null) => {
  const baseUrl =
    "https://my-json-server.typicode.com/jduncan017/se_project_react";
  // "http://localhost:3001";
  let options;

  switch (method) {
    case "POST":
      options = {
        method: "POST",
        url: `${baseUrl}/items`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      break;
    case "DELETE":
      options = {
        method: "DELETE",
        url: `${baseUrl}/items/${id}`,
      };
      break;
    case "GET":
      options = {
        method: "GET",
        url: `${baseUrl}/items`,
      };
      break;
    default:
      throw new Error(`Method not supported: ${method}`);
  }

  try {
    const res = await fetch(options.url, options);

    if (!res.ok) {
      throw new Error(`Oops there's an error!: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
