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

    this.state = { todos: store.state };
  }

  componentDidMount() {
    emitter.subscribe("event: update-store", (data) => {
      this.setState({ todos: store.state });
    });
  }
  render() {
    return (
      <div className="container">
        <Input />
        <Tasks todos={store.state} />
        <Footer todos={store.state} />
      </div>
    );
  }
}

export default App;
