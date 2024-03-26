import { Component } from 'react';
import ToDo from '../ToDo';
import todo from '../../todo.json';

class ToDoList extends Component {
  state = {
    todolist: todo,
    isCreate: false,
    isDelete: false,
  };
  render() {
    return (
      <>
        <ul class="list-group list-group-flush">
          {this.state.todolist.map(todo => (
            <ToDo key={todo.id} todo={todo} />
          ))}
        </ul>
      </>
    );
  }
}
export default ToDoList;
