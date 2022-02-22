import emitter from "../EventEmitter";
// import { v4 as uuidv4 } from "uuid";

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};

type StateType = {
  todos: Array<TodoType>;
  filterType: "all" | "active" | "completed";
  username: string;
};
enum FilterType {
  all = "all",
  active = "active",
  completed = "completed",
}

type FilterData = {
  filterType: FilterType;
};

class Store {
  state: StateType;
  constructor() {
    // super();
    this.state = { todos: [], filterType: "all", username: "" };
  }

  addItemToStore(data: TodoType): void {
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

  deleteItemFromStore(id: string): void {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);

    newState = newState.filter((item) => item.todo_id !== id);
    this.state.todos = newState;
    emitter.emit("event: update-store");
  }

  changeCompletedStatusOfItemStore(data: TodoType): void {
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

  checkAllTodos(): void {
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

  deleteAllCheckedTodos(): void {
    const oldTodoList = this.state.todos;
    let newState = new Array(...oldTodoList);
    newState = newState.filter((item) => item.completed === false);
    this.state.todos = newState;
    emitter.emit("event: update-store");
  }

  setFilterType(data: FilterData): void {
    const newState = data.filterType;
    this.state.filterType = newState;
    emitter.emit("event: update-store");
  }
}

const store = new Store();

emitter.subscribe("event:add-item", (data: TodoType) =>
  store.addItemToStore(data)
);

emitter.subscribe("event:change-filter-type", (data: FilterData) =>
  store.setFilterType(data)
);

export default store;
