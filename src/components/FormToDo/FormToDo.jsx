import { Component } from 'react';

class FormToDo extends Component {
  state = { todo: '' };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addToDo(this.state.todo);
    this.setState({ todo: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInput" className="form-label">
            Create ToDo
          </label>
          <input
            name="todo"
            type="text"
            className="form-control"
            id="exampleInput"
            onChange={this.handleChange}
            value={this.state.todo}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add ToDo
        </button>
      </form>
    );
  }
}

export default FormToDo;
