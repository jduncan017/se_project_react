const api = async (method, path, authToken = null, data = null) => {
  const baseUrl =
    "https://my-json-server.typicode.com/jduncan017/se_project_react";
  // "http://localhost:3001";
  let options;

  switch (method) {
    case "POST":
      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        authorization: `Bearer ${authToken}`,
      };
      break;
    case "DELETE":
      options = {
        method: "DELETE",
        authorization: `Bearer ${authToken}`,
      };
      break;
    case "GET":
      options = {
        method: "GET",
        authorization: `Bearer ${authToken}`,
      };
      break;
    case "AUTH":
      options = data;
      break;
    default:
      throw new Error(`Method not supported: ${method}`);
  }

  try {
    const res = await fetch(`${baseUrl}/${path}`, options);

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
