import emitter from "../EventEmitter";
import { v4 as uuidv4 } from "uuid";

class Store {
  constructor() {
    // super();
    this.state = [];
  }

  addItemToStore(data) {
    let newState = this.state;
    // console.log(newState);
    newState.push({ title: data.title, id: uuidv4(), completed: false });

    this.state = newState;

    emitter.emit("event: update-store", {});
  }

  deleteItemFromStore(id) {
    let newState = this.state;
    newState = newState.filter((item) => item.id !== id);
    this.state = newState;
    emitter.emit("event: update-store");
  }

  changeCompletedStatusOfItem(id) {
    let newState = this.state;
    newState = newState.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    });
    this.state = newState;

    emitter.emit("event: update-store");
  }

  checkAllTodos() {
    let newState = this.state;
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

    this.state = newState;
    // console.log(this.state);
    emitter.emit("event: update-store", {});
  }

  deleteAllCheckedTodos() {
    let newState = this.state;
    newState = newState.filter((item) => item.completed === false);
    this.state = newState;
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

export default store;
