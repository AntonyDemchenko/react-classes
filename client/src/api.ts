import store from "./Store/Store";
import emitter from "./EventEmitter";
import { type } from "os";

type localStorageObjectType = {
  accesstoken: string;
  refreshToken: string;
  user: string;
};

type Res = {
  todos: Array<Todos>;
  tokens?: localStorageObjectType;
  user: string;
};

type Todos = {
  title: string;
  todo_id: string;
  completed: boolean;
};

class Api {
  constructor() {}

  getAccessToken(): localStorageObjectType {
    return JSON.parse(localStorage.getItem("token") || "fail");
  }

  async getDataFromDB(): Promise<Res> {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
    });

    return response.json();
  }

  async addNewItemDB(data: { title: string }): Promise<Todos> {
    const newData = JSON.stringify({ title: data.title });
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
      body: newData,
    });

    return response.json();
  }

  async deleteItemFromDB(id: string): Promise<Todos> {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
    });
    return response.json();
  }

  async changeCompletedStatusOfItemDB(data: {
    id: string;
    completed: string;
  }): Promise<Todos> {
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

  async checkAllTodosDB(): Promise<void> {
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

  async deleteAllCheckedTodosDB(): Promise<void> {
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

emitter.subscribe("event:get-data-from-db", () =>
  api
    .getDataFromDB()
    .then((data) => {
      store.state.todos = data.todos;
      store.state.username = data.user;
      if (data.tokens) {
        localStorage.setItem("token", JSON.stringify(data.tokens));
      }
      emitter.emit("event: update-store", {});
    })
    .catch((error) => {
      emitter.emit("event: check-login", { login: false });
      console.error("Error:", error);
    })
);

emitter.subscribe("event:add-item-DB", (data: { title: string }) =>
  api.addNewItemDB(data).then((data) => {
    emitter.emit("event:add-item", {
      title: data.title,
      todo_id: data.todo_id,
      completed: data.completed,
    });
  })
);

emitter.subscribe("event:delete-item", (data: { id: string }) =>
  api.deleteItemFromDB(data.id).then((data) => {
    store.deleteItemFromStore(data.todo_id);
  })
);

emitter.subscribe(
  "event:change-checkbox",
  (data: { id: string; completed: string }) =>
    api.changeCompletedStatusOfItemDB(data).then((data) => {
      store.changeCompletedStatusOfItemStore(data);
    })
);

emitter.subscribe("event:change-all-checkboxes", () =>
  api.checkAllTodosDB().then(() => {
    store.checkAllTodos();
  })
);

emitter.subscribe("event:delete-all-checked", () =>
  api.deleteAllCheckedTodosDB().then(() => {
    store.deleteAllCheckedTodos();
  })
);

export default api;
