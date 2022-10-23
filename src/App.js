import React from "react";
import "./styles.css";
import "./form.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        "Don't Allow Empty Tasks",
        "Strike through",
        "No Duplicate input",
        "Style",
        "Delete Tasks"
      ]
    };
  }

  handleAdd(newTask) {
    if (!this.state.tasks.includes(newTask))
      this.setState({ tasks: this.state.tasks.concat([newTask]) });
    else {
      alert("Duplicate");
    }
  }

  handleDelete(task) {
    let newList = this.state.tasks.filter((thistask) => {
      return thistask !== task;
    });
    this.setState({ tasks: newList });
  }

  render() {
    return (
      <div className="TodoList">
        <h1>
          Todo List <span>Write what you need to do:</span>
        </h1>
        <div className="container">
          <TaskList
            tasks={this.state.tasks}
            delete={this.handleDelete.bind(this)}
          />
        </div>
        <TaskAdder onAdd={this.handleAdd.bind(this)} />
      </div>
    );
  }
}

/**
 * Represents a single task in the list.
 *
 * Props:
 *  - text: A string representing the contents of the task.
 */
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false };
  }

  handleCheck(event) {
    this.setState({ completed: event.target.checked });
  }

  render() {
    return (
      <div className="Todo">
        <li className={this.state.completed ? "completed" : "Todo-Task"}>
          <h4 className="center-me">
            <input
              type="checkbox"
              checked={this.state.completed}
              onChange={this.handleCheck.bind(this)}
            />
          </h4>
          <h3>{this.props.text}</h3>
        </li>
      </div>
    );
  }
}

/**
 * Represents a list of tasks.
 *
 * Props:
 *  - tasks: An array of strings, each representing a task.
 */
class TaskList extends React.Component {
  render() {
    return (
      <div className="TodoList">
        <ul>
          {this.props.tasks.map((task) => (
            <>
              <Task key={task} text={task} />
              <div className="right">
                <button onClick={() => this.props.delete(task)}>X</button>
              </div>
            </>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * Represents a widget that can take user input and call
 * a function to add a new task.
 *
 * Props:
 *  - onAdd: A function that takes a single string with
 *      the text of the new task to add. The function is
 *      called whenever the button is clicked.
 */
class TaskAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick() {
    if (this.state.inputValue === "") {
      alert("Cannot accept Blank Entry");
    } else {
      this.props.onAdd(this.state.inputValue);
      this.setState({ inputValue: "" });
    }
  }

  render() {
    return (
      <div className="NewTodoForm">
        <label htmlFor="newTask">New Task: </label>
        <input
          type="text"
          id="newTask"
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.handleClick.bind(this)}>Add Task</button>
      </div>
    );
  }
}
