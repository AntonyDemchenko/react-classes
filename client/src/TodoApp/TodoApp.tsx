import React from "react";
import Footer from "../Footer/Footer";
import Input from "../Input/Input";
import Tasks from "../Tasks/Tasks";
import store from "../Store/Store";
import emitter from "../EventEmitter";

type PropsType = {};

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};
type StateType = {
  todos: Array<TodoType>;
  filterType: string;
  username: string;
};

class TodoApp extends React.Component<{}, PropsType> {
  state: StateType;
  mounted: boolean;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    };

    this.mounted = true;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      // console.log("init!");
      emitter.emit("event:get-data-from-db");
      emitter.subscribe("event: update-store", () => {
        this.updateDate();
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateDate() {
    this.setState({
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    });
  }

  render() {
    // this.mounted = false;
    return (
      <>
        <Input />
        <Tasks {...this.state} />
        <Footer {...this.state} />
      </>
    );
  }
}

export default TodoApp;
