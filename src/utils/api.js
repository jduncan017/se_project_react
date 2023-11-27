const api = async (method, path, authToken = null, data = null) => {
  let baseUrl =
    process.env.NODE_ENV === "production"
      ? "api.wtwr.blinklab.com"
      : "http://localhost:3001";
  let options;

  switch (method) {
    case "POST":
    case "PATCH":
    case "PUT":
      const body = data ? JSON.stringify(data) : null;
      options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body,
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
    case "WEATHER":
      options = data;
      baseUrl = "https://api.openweathermap.org/";
      break;
    default:
      throw new Error(`Method not supported: ${method}`);
  }

  try {
    const res = await fetch(`${baseUrl}/${path}`, options);
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "Unknown error occured");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addLike = (data, token) => {
  return api("PUT", `items/${data.itemId}/likes`, token);
};

const removeLike = (data, token) => {
  return api("DELETE", `items/${data.itemId}/likes`, token);
};

export { api, addLike, removeLike };
