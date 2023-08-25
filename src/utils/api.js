const api = async (method, data = null, id = null) => {
  const baseUrl = "http://localhost:3001";

  const options = {
    method: method,
    headers: method === "POST" ? { "Content-Type": "application/json" } : {},
    body: method === "POST" ? JSON.stringify(data) : null,
  };

  let url = `${baseUrl}/items`;
  if (method === "DELETE" && id) {
    url += `/${id}`;
  }

  try {
    const res = await fetch(url, options);

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
