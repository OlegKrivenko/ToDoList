import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import ToDo from '../ToDo';
import FormToDo from 'components/FormToDo';

class ToDoList extends Component {
  state = {
    todoList: '',
    isCreate: false,
    isDelete: false,
  };

  componentDidMount() {
    console.log('componentDidMount');
    if (localStorage.getItem('todo')) {
      this.setState({ todoList: JSON.parse(localStorage.getItem('todo')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log(prevState.todoList.length);
    console.log(this.state.todoList.length);

    localStorage.setItem('todo', JSON.stringify(this.state.todoList));

    if (prevState.todoList.length > this.state.todoList.length) {
      Notify.failure('ToDo has been deleted successfully !');
    }
    if (prevState.todoList.length < this.state.todoList.length) {
      Notify.success('ToDo has been added successfully !');
    }
  }

  addToDo = value => {
    this.setState(prev => {
      return {
        todoList: [
          ...prev.todoList,
          {
            id: nanoid(),
            title: value,
            completed: false,
          },
        ],
      };
    });
  };

  deleteToDo = id => {
    this.setState(prev => ({
      todoList: prev.todoList.filter(todo => todo.id !== id),
    }));
  };

  handleCheckCompleted = id => {
    this.setState(prev => ({
      todoList: prev.todoList.map(todo =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      ),
    }));
  };

  render() {
    console.log('render');
    return (
      <>
        <h1>My todo list</h1>
        <FormToDo addToDo={this.addToDo} />
        {this.state.todoList.length > 0 && (
          <ul className="list-group list-group-flush">
            {this.state.todoList.map(todo => (
              <ToDo
                key={todo.id}
                todo={todo}
                deleteToDo={this.deleteToDo}
                handleCheckCompleted={this.handleCheckCompleted}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ToDoList;
