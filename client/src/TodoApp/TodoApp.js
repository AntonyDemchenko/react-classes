import React from "react";
import Footer from "../Footer/Footer";
import Input from "../Input/Input";
import Tasks from "../Tasks/Tasks";
import store from "../Store/Store";
import emitter from "../EventEmitter";
import api from "../api";
// import Header from "../Header/Header";
class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    };
  }

  componentDidMount() {
    // console.log("init!");
    emitter.emit("event:get-data-from-db");
    emitter.subscribe("event: update-store", (data) => {
      this.updateDate();
    });
  }

  updateDate() {
    this.setState({
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    });
  }

  render() {
    // console.log(this.props.data);
    console.log(this.state);
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
