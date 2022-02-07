import emitter from "../EventEmitter";
import { v4 as uuidv4 } from "uuid";

class Store {
  constructor() {
    // super();
    this.state = { todos: [], filterType: "all" };
  }

  addItemToStore(data) {
    const oldTodoList = this.state.todos;
    const newState = new Array(...oldTodoList);

    newState.push({ title: data.title, id: uuidv4(), completed: false });

    this.state.todos = newState;

    emitter.emit("event: update-store", {});
  }

  deleteItemFromStore(id) {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);

    newState = newState.filter((item) => item.id !== id);
    this.state.todos = newState;
    emitter.emit("event: update-store");
  }

  changeCompletedStatusOfItem(id) {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);
    newState = newState.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    });
    this.state.todos = newState;

    // console.log(this.state.todos);

    emitter.emit("event: update-store");
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

emitter.subscribe("event:delete-item", (data) =>
  store.deleteItemFromStore(data.id)
);

emitter.subscribe("event:change-checkbox", (data) =>
  store.changeCompletedStatusOfItem(data.id)
);

emitter.subscribe("event:change-all-checkboxes", (data) =>
  store.checkAllTodos()
);

emitter.subscribe("event:delete-all-checked", (data) =>
  store.deleteAllCheckedTodos()
);

emitter.subscribe("event:change-filter-type", (data) =>
  store.setFilterType(data)
);

export default store;
