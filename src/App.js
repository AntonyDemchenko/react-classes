import react from "react";
import "./App.css";
import Input from "./Input/Input";
import Tasks from "./Tasks/Tasks";
import Footer from "./Footer/Footer";
import store from "./Store/Store";
import emitter from "./EventEmitter";

class App extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: store.state.todos,
      filterType: store.state.filterType,
    };
  }

  componentDidMount() {
    emitter.subscribe("event: update-store", (data) => {
      this.setState({
        todos: store.state.todos,
        filterType: store.state.filterType,
      });
    });
  }
  render() {
    return (
      <div className="container">
        <Input />
        <Tasks data={this.state} />
        <Footer data={this.state} />
      </div>
    );
  }
}

export default App;
