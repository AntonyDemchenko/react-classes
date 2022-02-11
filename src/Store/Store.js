import emitter from "../EventEmitter";
// import { v4 as uuidv4 } from "uuid";

class Store {
  constructor() {
    // super();
    this.state = { todos: [], filterType: "all" };
  }

  async getDataFromDB() {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  addItemToStore(data) {
    const oldTodoList = this.state.todos;
    const newState = new Array(...oldTodoList);

    newState.push({
      title: data.title,
      todo_id: data.todo_id,
      completed: data.completed,
    });

    this.state.todos = newState;

    emitter.emit("event: update-store", {});
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

  deleteItemFromStore(id) {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);

    newState = newState.filter((item) => item.todo_id !== id);
    this.state.todos = newState;
    emitter.emit("event: update-store");
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

  changeCompletedStatusOfItemStore(data) {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);
    newState = newState.map((item) => {
      if (item.todo_id === data.todo_id) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    });
    this.state.todos = newState;

    emitter.emit("event: update-store");
  }

  async checkAllTodosDB() {
    console.log("ssssssssssssssssssssssssssssss");
    let completedSwitcher = true;
    if (this.state.todos.every((item) => item.completed === true)) {
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

  checkAllTodos() {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);
    if (newState.every((item) => item.completed === true)) {
      newState = newState.map((item) => {
        item.completed = false;
        return item;
      });
    } else {
      newState = newState.map((item) => {
        item.completed = true;
        return item;
      });
    }

    this.state.todos = newState;
    emitter.emit("event: update-store", {});
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

  deleteAllCheckedTodos() {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);
    newState = newState.filter((item) => item.completed === false);
    this.state.todos = newState;
    emitter.emit("event: update-store");
  }

  setFilterType(data) {
    const oldTodoList = this.state.filterType;
    let newState = new Array(...oldTodoList);
    newState = data.filterType;
    this.state.filterType = newState;
    emitter.emit("event: update-store");
  }
}

const store = new Store();

emitter.subscribe("event:add-item", (data) => store.addItemToStore(data));

emitter.subscribe("event:get-data-from-db", (data) =>
  store.getDataFromDB().then((data) => {
    store.state.todos = data;
    emitter.emit("event: update-store", {});
  })
);

emitter.subscribe("event:delete-item", (data) =>
  store.deleteItemFromDB(data.id).then((data) => {
    store.deleteItemFromStore(data.todo_id);
  })
);

emitter.subscribe("event:change-checkbox", (data) =>
  store.changeCompletedStatusOfItemDB(data).then((data) => {
    store.changeCompletedStatusOfItemStore(data);
  })
);

emitter.subscribe("event:change-all-checkboxes", (data) =>
  store.checkAllTodosDB().then((data) => {
    store.checkAllTodos();
  })
);

emitter.subscribe("event:delete-all-checked", (data) =>
  store.deleteAllCheckedTodosDB().then((data) => {
    store.deleteAllCheckedTodos();
  })
);

emitter.subscribe("event:change-filter-type", (data) =>
  store.setFilterType(data)
);

export default store;
