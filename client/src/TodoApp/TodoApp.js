import React from "react";
import Footer from "../Footer/Footer";
import Input from "../Input/Input";
import Tasks from "../Tasks/Tasks";
import store from "../Store/Store";
import emitter from "../EventEmitter";
class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: store.state.todos,
      filterType: store.state.filterType,
    };
  }

  componentDidMount() {
    console.log("init!");
    emitter.emit("event:get-data-from-db");
    emitter.subscribe("event: update-store", (data) => {
      this.setState({
        todos: store.state.todos,
        filterType: store.state.filterType,
      });
    });
    console.log(this.state.todos);
  }

  render() {
    // console.log(this.props.data);
    return (
      <>
        <Input />
        <Tasks data={this.state} />
        <Footer data={this.state} />
      </>
    );
  }
}

export default TodoApp;
