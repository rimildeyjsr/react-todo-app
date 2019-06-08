import React, {Component} from 'react';
import './App.css';
import Todo from './components/Todo-Component/Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div className="App">
        <Todo />
      </div>
    );
  }
}

export default App;
