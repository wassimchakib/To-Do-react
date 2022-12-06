import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
class InputTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };

    this.onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    this.handleSubmit = (e) => {
      const { title } = this.state;
      const { addTodoProps } = this.props;
      e.preventDefault();
      if (title.trim()) {
        addTodoProps(title);
        this.setState({
          title: '',
        });
      } else {
        alert('Please write item');
      }
    };
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add todo..."
          name="title"
          value={title}
          onChange={this.onChange}
        />
        <button type="submit" className="input-submit">Submit</button>
      </form>
    );
  }
}

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

export default InputTodo;
