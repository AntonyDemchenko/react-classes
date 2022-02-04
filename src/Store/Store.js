import emitter from "../EventEmitter";
import { v4 as uuidv4 } from "uuid";

class Store {
  constructor() {
    // super();
    this.state = [];
  }

  addItemToStore(data) {
    // console.log(uuidv4());

    let newState = this.state;
    newState.push({ title: data.title, id: uuidv4(), completed: false });

    this.state = newState;

    // console.log(this.state);
  }
  render() {
    return this.Store;
  }
}

const store = new Store();

emitter.subscribe("event:add-item", (data) => store.addItemToStore(data));

emitter.subscribe("event:add-item", (data) => this.addNewItem(data));

export default store;
