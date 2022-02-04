import emitter from "../EventEmitter";
import { v4 as uuidv4 } from "uuid";

class Store {
  constructor() {
    // super();
    this.state = [];
  }

  addItemToStore(data) {
    let newState = this.state;
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
}

const store = new Store();

emitter.subscribe("event:add-item", (data) => store.addItemToStore(data));

emitter.subscribe("event:delete-item", (data) =>
  store.deleteItemFromStore(data.id)
);

emitter.subscribe("event:change-checkbox", (data) =>
  store.changeCompletedStatusOfItem(data.id)
);

// emitter.subscribe("event: update-store");

export default store;
