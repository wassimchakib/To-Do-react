import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';

// eslint-disable-next-line react/prefer-stateless-function
class TodoContainer extends React.Component {
  constructor() {
    super();
    this.state = JSON.parse(localStorage.getItem('data')) || { todos: [] };

    this.handleChange = (id) => {
      this.setState((prevState) => ({
        todos: prevState.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        }),
      }));
    };

    this.delTodo = (id) => {
      const { todos } = this.state;
      this.setState({
        todos: [...todos.filter((todo) => todo.id !== id)],
      });
    };

    this.addTodoItem = (title) => {
      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
      };
      const { todos } = this.state;
      this.setState({
        todos: [...todos, newTodo],
      });
    };
    this.setUpdate = (updatedTitle, id) => {
      const { todos } = this.state;
      this.setState({
        todos: todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title: updatedTitle,
            };
          }
          return todo;
        }),
      });
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((data) => this.setState({ todos: data }));
  }

  componentDidUpdate() {
    localStorage.setItem('data', JSON.stringify(this.state));
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
