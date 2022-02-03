import react from "react";
import emitter from "../EventEmitter";

class Store {
  constructor() {
    // super();
    this.state = [];
  }

  addItemToStore(data) {
    // this.setState(this.state.items.push({ title: data.title }));
    console.log(this.state);
    // this.setState({ items: this.state.items.push({ title: data.title }) });
    this.state = this.state.push({ title: data.title });

    console.log(this.state[0]);
  }

  //   componentDidMount() {
  // console.log("done");

  //   }

  //   render() {
  //     return <></>;
  //   }
}

const store = new Store();

emitter.subscribe("event:add-item", (data) => store.addItemToStore(data));

export default Store;
