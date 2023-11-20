const api = async (method, path, authToken = null, data = null) => {
  const baseUrl =
    // "https://my-json-server.typicode.com/jduncan017/se_project_react";
    "http://localhost:3001";
  let options;

  switch (method) {
    case "POST":
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      };
      break;
    case "DELETE":
      options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      break;
    case "GET":
      options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      break;
    case "AUTH":
      options = data;
      break;
    default:
      throw new Error(`Method not supported: ${method}`);
  }

  try {
    console.log(
      `Request: ${method}, Options: ${JSON.stringify(options)}, Path: ${path}`
    );
    const res = await fetch(`${baseUrl}/${path}`, options);
    console.log(res);

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
