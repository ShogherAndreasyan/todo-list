const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskApi {
  #request(method, body = null) {
    const info = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body !== null) {
      info.body = JSON.stringify(body);
    }
    return fetch(taskApiUrl, info)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        return data;
      });
  }
  get() {
    return this.#request("GET");
  }
  post(task) {
    return this.#request("POST", task);
  }
  put() {}
  delete() {}
}
