import store from "./Store/Store";
import emitter from "./EventEmitter";

class Api {
  constructor() {}

  getAccessToken() {
    return JSON.parse(localStorage.getItem("token")) || "fail";
  }

  async getDataFromDB() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // console.log(this.getAccessToken());
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
    });
    // console.log(response.json());
    return response.json();
  }

  async addNewItemDB(data) {
    const newData = JSON.stringify({ title: data.title });
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
      body: newData,
    });

    // data.title = " ";

    return response.json();
  }

  async deleteItemFromDB(id) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
    });
    return response.json();
  }

  async changeCompletedStatusOfItemDB(data) {
    const response = await fetch(`http://localhost:3000/todos/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
      body: JSON.stringify({ completed: !data.completed }),
    });
    return response.json();
  }

  async checkAllTodosDB() {
    // console.log("ssssssssssssssssssssssssssssss");
    let completedSwitcher = true;
    if (store.state.todos.every((item) => item.completed === true)) {
      completedSwitcher = false;
    }

    const response = await fetch(
      `http://localhost:3000/todos/check-all/${completedSwitcher}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAccessToken().accesstoken,
        },
      }
    );
  }

  async deleteAllCheckedTodosDB() {
    const response = await fetch(
      `http://localhost:3000/todos/delete-checked/all`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAccessToken().accesstoken,
        },
      }
    );
  }
}

const api = new Api();

emitter.subscribe("event:get-data-from-db", (data) =>
  api
    .getDataFromDB()
    .then((data) => {
      console.log(data);

      // console.log("uuuuuuuuuuu", data);
      store.state.todos = data.todos;
      store.state.username = data.user;
      if (data.tokens) {
        store.state.username = data.tokens.user;
        localStorage.setItem("token", JSON.stringify(data.tokens));
      }
      emitter.emit("event: update-store", {});
    })
    .catch((error) => {
      emitter.emit("event: check-login", { login: false });
      console.error("Error:", error);
    })
);
emitter.subscribe("event:add-item-DB", (data) =>
  api.addNewItemDB(data).then((data) => {
    // console.log("RES 3", data);

    emitter.emit("event:add-item", {
      title: data.title,
      todo_id: data.todo_id,
      completed: data.completed,
    });
  })
);

emitter.subscribe("event:delete-item", (data) =>
  api.deleteItemFromDB(data.id).then((data) => {
    store.deleteItemFromStore(data.todo_id);
  })
);

emitter.subscribe("event:change-checkbox", (data) =>
  api.changeCompletedStatusOfItemDB(data).then((data) => {
    store.changeCompletedStatusOfItemStore(data);
  })
);

emitter.subscribe("event:change-all-checkboxes", (data) =>
  api.checkAllTodosDB().then((data) => {
    store.checkAllTodos();
  })
);

emitter.subscribe("event:delete-all-checked", (data) =>
  api.deleteAllCheckedTodosDB().then((data) => {
    store.deleteAllCheckedTodos();
  })
);

export default api;
