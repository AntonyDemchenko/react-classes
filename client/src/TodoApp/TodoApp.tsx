import React from "react";
import Footer from "../Footer/Footer";
import Input from "../Input/Input";
import Tasks from "../Tasks/Tasks";
import store from "../Store/Store";
// import emitter from "../EventEmitter";

import { connect } from "react-redux";
import { getAllTodos } from "../redux/actions"

type PropsType = {
  getAllTodos: any
};

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

class TodoApp extends React.Component<PropsType> {
  state: StateType;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    };

  }

  componentDidMount() {
    this.updateDate();
    this.props.getAllTodos(this.state)
  }

  updateDate() {
    this.setState({
      todos: store.state.todos,
      filterType: store.state.filterType,
      username: store.state.username,
    });

  }

  render() {

    return (
      <>
        <Input />
        <Tasks />
        <Footer />
      </>
    );
  }
}


const mapDispatchToProps = {
  getAllTodos
}
export default connect(null, mapDispatchToProps)(TodoApp);
