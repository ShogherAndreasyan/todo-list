const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskApi {
  #request(method, data = {}) {
    const { body, params, filters } = data;
    const info = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      info.body = JSON.stringify(body);
    }
    let url = taskApiUrl;
    if (params) {
      url = `${url}/${params}`;
    }
    if (filters) {
      let query = "?";
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        query += `${key}=${value}&`;
      });
      url += query;
    }
    return fetch(url, info)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        return data;
      });
  }
  get(filters) {
    return this.#request("GET", {filters: filters});
  }
  post(task) {
    return this.#request("POST", { body: task });
  }
  update(editTask) {
    return this.#request("PUT", { body: editTask, params: editTask._id });
  }
  delete(taskId) {
    return this.#request("DELETE", { params: taskId });
  }
  deleteSome(taskIds) {
    return this.#request("PATCH", { body: { tasks: taskIds } });
  }
}
