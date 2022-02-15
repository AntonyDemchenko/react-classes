import store from "./Store/Store";
import emitter from "./EventEmitter";

class Api {
  constructor() {
    // super();
  }

  async getDataFromDB() {
    console.log("dddddddddddddddd");
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  async deleteItemFromDB(id) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async changeCompletedStatusOfItemDB(data) {
    const response = await fetch(`http://localhost:3000/todos/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
      store.state.todos = data;
      emitter.emit("event: update-store", {});
    })
    .catch((error) => {
      console.error("Error:", error);
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
