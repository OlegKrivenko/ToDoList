import { Component } from 'react';
import ToDo from '../ToDo';
import todo from '../../todo.json';
import FormToDo from 'components/FormToDo';
import { nanoid } from 'nanoid';

class ToDoList extends Component {
  state = {
    todoList: todo,
    isCreate: false,
    isDelete: false,
  };

  componentDidMount() {
    if (localStorage.getItem('todo')) {
      // console.log(Boolean(localStorage.getItem('todo')));

      this.setState({ todoList: JSON.parse(localStorage.getItem('todo')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

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
    return (
      <>
        <FormToDo addToDo={this.addToDo} />
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
      </>
    );
  }
}

export default ToDoList;
