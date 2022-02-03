import react from "react";
import emitter from "../EventEmitter";

class Store {
  constructor() {
    // super();
    this.state = [];
  }

  addItemToStore(data) {
    console.log(this.state);

    let newState = this.state;
    newState.push({ title: data.title });

    this.state = newState;

    console.log(this.state);
  }
}

const store = new Store();

emitter.subscribe("event:add-item", (data) => store.addItemToStore(data));

export default Store;
